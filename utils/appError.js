class AppError extends Error {
    constructor(message, statusCode) {
        // We use super method, in order to call the parent constructor
        super(message)
        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith(4) ? 'fail' : 'error'
        // some other errors which we are not able to catch will not have this property set
        this.isOperational = true
        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = AppError