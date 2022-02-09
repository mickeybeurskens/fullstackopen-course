const cors = require('cors')
const express = require('express')
require('express-async-errors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const app = express()

// import {blogsRoute} from './controllers/blogs'
const blogsRoute = require('./controllers/blogs')
const usersRoute = require('./controllers/users')
const loginRoute = require('./controllers/login')

mongoose.connect(config.MONGO_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogsRoute)
app.use('/api/users', usersRoute)
app.use('/api/login', loginRoute)
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app