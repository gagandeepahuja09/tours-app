const mongoose = require('mongoose')
const slugify = require('slugify')

const { tourStats } = require('../controllers/tourController')

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true
    }, 
    slug: String,
    rating: {
        type: Number,
        default: 3.5
    },
    duration: {
        type: Number,
        required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a group size']
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have a difficulty']
    },
    // We will calculate these two and are not expected a input, hence not required
    ratingsAverage: {
        type: Number,
        default: 3.5
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a summary']
    },
    description: {
        type: String,
        trim: true
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    secretTour: {
        type: Boolean,
        default: false
    },
    startDates: [Date]
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

tourSchema.virtual('durationWeeks').get(function() {
    // we are using normal function instead of arrow function, because arrow function does not have
    // access to this keyword --> this here stores the reference to the document.
    return this.duration / 7
})

// Document Middleware: Runs before .create() and .save()
tourSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true })
    next()
})

// Query Middleware: Executed before a query await ----.find() => await is the step at which we execute 
// the query, so this will happen before it. 
// For all queries, we only want to show tours which are not secret
tourSchema.pre(/^find/, function(next) {
//  tourSchema.pre('find', function(next) {
    this.find({ secretTour: { $ne: true } })
    next()
})

// tourSchema.post('save', function(doc, next) {
//     console.log(doc)
//     next()
// })

tourSchema.pre('aggregate', function(next) {
    // insert at the start of the array
    this.pipeline().unshift({ $match: { secretTour: { $ne: true } }})
    next()
})

const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour