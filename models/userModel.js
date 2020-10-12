const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell your name']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },    
    photo: String,
    role: {
        type: String,
        enum: ['user', 'guide', 'lead-guide', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false // by doing this, it will automatically not show, on any output
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            // This only works on CREATE and SAVE
            validator: function(el) {
                return el === this.password
            }
        },
        message: 'Passwords are not the same'
    },
    passwordChangedAt: Date,
    passwordResetToken: String, 
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
})

userSchema.pre('save', async function(next) {
    if (!this.isModified('password'))   return next()
    this.password = await bcrypt.hash(this.password, 12)

    // We don't want to persist the confirm password
    this.passwordConfirm = undefined
    next()
})

userSchema.pre('save', async function(next) {
    if (!this.isModified('password') || this.isNew)   return next()
    // We subtract one second to ensure password changed at time < iat for jwt
    // So that user is able to login
    this.passwordChangedAt = Date.now() - 1000
    next()
})

userSchema.pre(/^find/, async function(next) {
    this.find({ active: { $ne: false } })
    next()
})

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10)
        return changedTimestamp >= JWTTimestamp
    }
    return false
}

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex')

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')
    
    this.passwordResetExpires = Date.now() + (10 * 60 * 1000)

    console.log({ resetToken, enc: this.passwordResetToken })
    return resetToken
}

const User = mongoose.model('User', userSchema)

module.exports = User