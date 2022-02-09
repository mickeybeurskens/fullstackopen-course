const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const app = express()

// import {blogsRoute} from './controllers/blogs'
const blogsRoute = require('./controllers/blogs')

const mongoUrl = 'mongodb+srv://fullstackmongo:m3C85u7YFsBuc6@cluster0.saorm.mongodb.net/blog-list?retryWrites=true&w=majority'
mongoose.connect(mongoUrl)
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