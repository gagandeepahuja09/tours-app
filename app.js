const express = require('express')
const morgan = require('morgan')

const AppError = require('./utils/appError')
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

app.all('*', (req, res, next) => {
    // res.status(404).json({
    //     status: 'fail',
    //     message: `Can't find ${req.originalUrl} on this server`
    // })
    // const err = new Error(`Can't find ${req.originalUrl} on this server`)
    // err.status = 'fail'
    // err.statusCode = 400
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    res.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message
    })
})

module.exports = app