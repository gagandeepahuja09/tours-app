const express = require('express')
const fs = require('fs')
const e = require('express')

const app = express()
app.use(express.json())

const port = 4199

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

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
                message: 'No tour found with the give id'
            })    
        }
    res.status(200).json({
        status: 'success',
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

app
    .route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour)

app
    .route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)    
    
app.listen(port, () => {
    console.log('Running on port')
})

