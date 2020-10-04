const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')
const jwt = require('jsonwebtoken')
const AppError = require('../utils/appError')
const { promisify } = require('util')

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

    const token = signToken(newUser._id)

    res.status(201).json({
        status: 'Success',
        token,
        data: {
            user: newUser
        }
    })
})

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return next(new AppError('Please provide both email and password!', 400))
    }

    const user = await User.findOne({ email }).select('+password')

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password!', 401))
    }

    const token = signToken(user._id)

    res.status(200).json({
        status: 'success',
        token
    })
})

exports.protect = catchAsync(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    console.log(token)
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


})