const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const app = express()

// import {blogsRoute} from './controllers/blogs'
const blogsRoute = require('./controllers/blogs')

mongoose.connect(config.MONGO_URI)
  .then(() => {
    console.info('connected to MongoDB')
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use('/api/blogs', blogsRoute)

module.exports = app