const app = require('./app')

const port = 4199
app.listen(port, () => {
    console.log('Running on port', port)
})