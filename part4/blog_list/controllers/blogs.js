const blogsRoute = require('express').Router()
const Blog = require('../models/blog')

blogsRoute.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRoute.post('/', async (request, response) => {
  const blog = new Blog(request.body)

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