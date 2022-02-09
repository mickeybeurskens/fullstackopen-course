const blogsRoute = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRoute.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user',
    { username: 1, name: 1 })
  response.json(blogs)
})

blogsRoute.post('/', async (request, response) => {
  const allUsers = await User.find({})
  const blog = new Blog({ ...request.body, user: allUsers[0].id })

  const resultBlog = await blog.save()
  response.status(201).json(resultBlog)
})

blogsRoute.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndRemove(id)
  response.status(204).end()
})

blogsRoute.put('/:id', async (request, response) => {
  const id = request.params.id
  const likes = { likes: request.body.likes }
  const newBlog = await Blog.findByIdAndUpdate(id, likes)
  response.json(newBlog)
})

module.exports = blogsRoute