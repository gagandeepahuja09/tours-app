const fs = require('fs')

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        tours
    })
}

exports.getTour = (req, res) => {
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

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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