const Tour = require('../models/tourModel')

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        // results: tours.length,
        // tours
    })
}

exports.getTour = (req, res) => {
    const id = Number(req.params.id)
    // const tour = tours.find(el => el.id === id)
    // res.status(200).json({
    //     status: 'success',
    //     requestedAt: req.requestTime,
    //     tour
    // })
}

exports.createTour = (req, res) => {    
    res.status(201).json({
        status: 'success',
        // data: {
        //     tour: newTour
        // }
    })
}

exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        tour
    })
}

exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null
    })
}