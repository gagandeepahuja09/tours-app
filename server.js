const app = require('./app')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config({ path: './config.env' })

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(con => {console.log('DB Connection successful') })

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, 'A tour must have a name'],
        unique: true
    }, 
    rating: {
        type: Number,
        default: 3.5
    },
    price: {
        type: Number,
        required: [ true, 'A tour must have a price']
    }
})

const Tour = mongoose.model('Tour', tourSchema)

const testTour = new Tour({
    name: "The Forest Hiker",
    rating: 4.7,
    price: 497
})

testTour
    .save()
    .then(doc => {
        console.log(doc)
    })
    .catch(err => {
        console.log('ERROR :', err)
    })

const port = process.env.PORT || 4199
app.listen(port, () => {
    console.log('Running on port', port)
})