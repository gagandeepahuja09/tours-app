const Review = require('../models/reviewModel')
const catchAsync = require('../utils/catchAsync')

exports.getAllReviews = catchAsync(async (req, res, next) => {
    const review = await Review.find()
    res.status(200).json({
        status: 'success',
        data: review
    })
})

exports.createReview = catchAsync(async (req, res, next) => {
    // For nested tour routes
    // We will get this from currently logged in user
    if (!req.body.user) req.body.user = req.user.id
    if (!req.body.tour) req.body.tour = req.params.tourId
    const newReview = await Review.create(req.body)
    res.status(201).json({
        status: 'success',
        data: newReview
    })
})
