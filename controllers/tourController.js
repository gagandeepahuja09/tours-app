const Tour = require('../models/tourModel')

exports.getAllTours = async (req, res) => {
    try {
        const queryObj = { ...req.query }
        const excludedFields = ['page', 'fields', 'limit', 'sort']
        excludedFields.forEach(ele => delete queryObj[ele])

        let queryStr = JSON.stringify(queryObj)
        // \b => exact matches, /g => only fully
        queryStr = queryStr.replace(/\b{gte|gt|lt|lte}\b/g, match => `$${match}`)
        console.log(queryStr)
        const query = Tour.find(JSON.parse(queryStr))
        const tours = await query
        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: tours
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id)
        res.status(200).json({
            status: 'success',
            data: tour
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

exports.createTour = async (req, res) => {    
    try {
        const newTour = await Tour.create(req.body)
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    } catch (err) {
        // Will come mostly when it fails the data validations of mongoose
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true, 
            runValidators: true    
        })
        res.status(200).json({
            status: 'success',
            data: { tour }
        })
    } catch(err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: 'success',
            data: 'deleted'
        })
    } catch(err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}