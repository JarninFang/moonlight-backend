const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const usersRouter = require('./controllers/users')
const mongoose = require('mongoose')
require('dotenv').config()
const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true }).then((result) => {
    console.log('Connected to mongodb database ')
}).catch(err => {
    console.log('Error connecting to mongodb database')
})

app.use(cors())
app.use(bodyParser.json())

app.use('/api/users', usersRouter)

module.exports = app