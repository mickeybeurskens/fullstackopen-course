const blogsRoute = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const tokenError = (response) => {
  return response.status(401).json({
    error: 'token missing or invalid'
  })
}

blogsRoute.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user',
    { username: 1, name: 1 })
  response.json(blogs)
})

blogsRoute.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return tokenError(response)
  }
  const user = await User.findById(decodedToken.id)
  const blog = new Blog({ ...request.body, user: user.id })

  const resultBlog = await blog.save()
  response.status(201).json(resultBlog)
})

blogsRoute.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const id = request.params.id
  if (!decodedToken.id) {
    return tokenError(response)
  }
  const blog = await Blog.findById(id)
  if (decodedToken.id.toString() !== blog.user.toString()) {
    response.status(401)
      .json({ error: 'You cannot delete blogs that are not yours' })
  }
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogsRoute.put('/:id', async (request, response) => {
  const id = request.params.id
  const likes = { likes: request.body.likes }
  const newBlog = await Blog.findByIdAndUpdate(id, likes)
  response.json(newBlog)
})

module.exports = blogsRoute