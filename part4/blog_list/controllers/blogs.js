const blogsRoute = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRoute.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user',
    { username: 1, name: 1 })
  response.json(blogs)
})

blogsRoute.post('/', async (request, response) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }
  const user = await User.findById(decodedToken.id)
  const blog = new Blog({ ...request.body, user: user.id })

  const resultBlog = await blog.save()
  response.status(201).json(resultBlog)
})

blogsRoute.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndRemove(id)
  response.status(204).end()
})

blogsRoute.put('/:id', async (request, response) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  const id = request.params.id
  if (!decodedToken.id || decodedToken.id !== id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }
  const likes = { likes: request.body.blog.likes }
  const newBlog = await Blog.findByIdAndUpdate(id, likes)
  response.json(newBlog)
})

module.exports = blogsRoute