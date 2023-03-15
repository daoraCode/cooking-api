const express = require('express')
const app = express()

const mongoose = require('mongoose')

require('dotenv').config()

const logger = require('morgan')

const port = process.env.PORT || 5000

// connection to database
mongoose.connect(process.env.MONGO_URI)
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('Database connection established.'))

// imported routes
const userRoutes = require('./routes/user')
const subscriberRoutes = require('./routes/subscriber')
const courseRoutes = require('./routes/course')

// auth
// const { signup, login } = require('./controllers/authController')

// read json data
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// morgan logs
app.use(logger('tiny'))

app.use('/api/users', userRoutes)
app.use('/api/subscribers', subscriberRoutes)
app.use('/api/courses', courseRoutes)

app.listen(port, () => {
  console.log(`Server is running on : ${port}`)
})
