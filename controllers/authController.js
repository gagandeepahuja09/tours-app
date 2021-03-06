const crypto = require('crypto')
const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')
const jwt = require('jsonwebtoken')
const AppError = require('../utils/appError')
const { promisify } = require('util')
const sendEmail = require('../utils/email')
const { create } = require('../models/userModel')

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id)

    const jwtCookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        secure: false,
        httpOnly: true
    }
    if (process.env.NODE_ENV === 'production')    jwtCookieOptions.secure = true

    res.cookie('jwt', token, jwtCookieOptions)
    
    user.password = undefined
    res.status(statusCode).json({
        status: 'Success',
        token,
        data: {
            user
        }
    })
}

const signToken = id => { 
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

exports.signup = catchAsync(async (req, res, next) => {
    const { name, email, password, passwordConfirm, role } = req.body
    const newUser = await User.create({
        name,
        email,
        password,
        passwordConfirm,
        role
    })
    createSendToken(newUser, 201, res)
})

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return next(new AppError('Please provide both email and password!', 400))
    }

    const user = await User.findOne({ email }).select('+password')
    console.log(user, password)

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password!', 401))
    }

    createSendToken(user, 200, res)
})

exports.protect = catchAsync(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    if (!token) {
        return next(new AppError('You are not logged in. Please login to get access', 401))
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY)

    const currentUser = await User.findById(decoded.id)
    if (!currentUser) {
        return next(new AppError('The user belonging to this token no longer exists', 401))
    }

    if(currentUser.changedPasswordAfter(decoded.iat)) {
        return next(new AppError('Password was recently changed. Please login again!', 401))
    }

    req.user = currentUser
    next()    
})

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError('You do not have permissions to perform this action', 403))
        }
        next()
    }
}

exports.forgotPassword = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        next(new AppError('No user found with this email address', 400))
    }
    const resetToken = user.createPasswordResetToken()
    await user.save({ validateBeforeSave: false })

    const resetURL = `${req.protocol}://${req.get('host')}/api/V1/users/reset-password/${resetToken}`
    const message = `Forgot your password? Submit a PATCH request with new password and password confirm to:
     ${resetURL}. \nIf you didn't forget your password, please ignore this email.`
    
    try {
        await sendEmail({
            email: user.email,
            subject: 'Your Password Reset Token(Valid for 10 minutes)',
            message
        })
    
        res.status(200).json({
            status: 'success',
            message: 'Token sent on email!'
        })
    } catch (err) {
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined
        await user.save({ validateBeforeSave: false })

        return next(new AppError('There was an error sending the email. Please try again later!', 500))
    }
})

exports.resetPassword = catchAsync( async(req, res, next) => {
    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.resetToken)
        .digest('hex')
    const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } })
    if (!user) {
        return next(new AppError('Token is invalid or has expired', 400))
    }
    user.password = req.body.password
    user.passwordConfirm = req.body.passwordConfirm
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()

    createSendToken(user, 200, res)
})

exports.updatePassword = catchAsync(async (req, res, next) => {
    // 1. Get user from collection
    // Since user has to be already logged in, so the user details are stored in req.user in protect middleware
    const user = await User.findById(req.user._id).select('+password')
    if (!user) {
        next(new AppError('No user found with the given id', 400))
    }
    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
        next(new AppError('The password entered is incorrect', 401))
    }
    user.password = req.body.password,
    user.passwordConfirm = req.body.passwordConfirm
    await user.save()

    createSendToken(user, 200, res)
})