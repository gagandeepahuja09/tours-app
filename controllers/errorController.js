const AppError = require("../utils/appError")

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.statusCode,
        error: err,
        message: err.message,
        stack: err.stack
    })
}

const handleJWTError = () => new AppError('Invalid token. Please login again', 401)

const handleJWTExpiredError = () => new AppError('Token expired. Please login again', 401)

const sendErrorProd = (err, res) => {
    // Trusted, operational error : Send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.statusCode,
            message: err.message
        })
    } else {
    // Programming or other unknown error, don't want to leak details to the client
    // 1) Log Error for ourselves
    console.error('ERROR 👀', err)
    // 2) Send generic message to the client
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!'
        })
    }
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'
    const ENV = process.env.NODE_ENV
    if (ENV === 'development') {
        sendErrorDev(err, res)    
    } else {
        let error = { ...err }
        if (err.name === "JsonWebTokenError") error = handleJWTError()
        if (err.name === "TokenExpiredError") error = handleJWTExpiredError()
        sendErrorProd(error, res)
    }
}