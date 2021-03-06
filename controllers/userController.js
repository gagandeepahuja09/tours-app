const User = require('../models/userModel')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const factory = require('./handlerFactory')

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find() 
 
    res.status(200).json({
        status: 'success',
        results: users.length,
        data: users
    })
})

exports.getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet implemented'
    })
}

exports.createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet implemented'
    })
}

exports.updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet implemented'
    })
}

exports.deleteUser = factory.deleteOne(User)

exports.deleteMe = catchAsync(async(req, res) => {
    await User.findByIdAndUpdate(req.user.id, { active: false })
    res.status(204).json({
        status: 'success'
    })
})