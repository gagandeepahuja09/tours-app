const express = require('express')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

const rateLimiter = rateLimit({
    max: 20,
    windowMs: 15 * 60 * 1000,
    message: 'Too many requests on this IP. Please try in 15 minutes'
})

app.use('/api', rateLimiter)

app.use(express.json())

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

app.use(globalErrorHandler)

module.exports = app