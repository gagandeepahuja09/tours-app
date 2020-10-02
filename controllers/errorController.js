const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.statusCode,
        error: err,
        message: err.message,
        stack: err.stack
    })
}

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
    console.error('ERROR ::', err)
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
        sendErrorProd(err, res)    
    } else {
        sendErrorDev(err, res)
    }
}