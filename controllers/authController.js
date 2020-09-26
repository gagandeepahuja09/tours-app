const User = require('../models/userModel')

exports.signup = async (req, res) => {
    const newUser = await User.create(req.body)

    res.status(201).json({
        status: 'Success',
        data: {
            user: newUser
        }
    })
}