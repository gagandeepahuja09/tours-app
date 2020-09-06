const express = require('express')
const morgan = require('morgan')
const fs = require('fs')

const app = express()

app.use(express.json())
app.use(morgan('dev'))

const port = 4199

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

// ROUTE HANDLERS

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        tours
    })
}

const getTour = (req, res) => {
    const id = Number(req.params.id)
        const tour = tours.find(el => el.id === id)
        if (!tour) {
            return res.status(404).json({
                status: 'failed',
                requestedAt: req.requestTime,
                message: 'No tour found with the give id'
            })    
        }
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        tour
    })
}

const createTour = (req, res) => {
    const nextId = tours[tours.length - 1].id + 1
    const newTour = {
        id: nextId,
        ...req.body
    }
    tours.push(newTour)    
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    })
}

const updateTour = (req, res) => {
    const id = Number(req.params.id)
    const tour = tours.find(el => el.id === id)
    if (!tour) {
        return res.status(404).json({
            status: 'failed',
            message: 'No tour found with the give id'
        })    
    }
    res.status(200).json({
        status: 'success',
        tour
    })
}

const deleteTour = (req, res) => {
    const id = Number(req.params.id)
    const tour = tours.find(el => el.id === id)
    if (!tour) {
        return res.status(404).json({
            status: 'failed',
            message: 'No tour found with the give id'
        })    
    }
    res.status(204).json({
        status: 'success',
        data: null
    })
}

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet implemented'
    })
}

const getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet implemented'
    })
}

const createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet implemented'
    })
}

const updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet implemented'
    })
}

const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet implemented'
    })
}

// ROUTES

// Mounting the router
const tourRouter = express.Router()
const userRouter = express.Router()

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

tourRouter
    .route('/')
    .get(getAllTours)
    .post(createTour)  

tourRouter
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)
    
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    console.log('YO MAN, THis IS the MiddleWAREEE')
    next()
})     

userRouter
    .route('/')
    .get(getAllUsers)
    .post(createUser)   

userRouter
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)   
    
app.listen(port, () => {
    console.log('Running on port', port)
})

