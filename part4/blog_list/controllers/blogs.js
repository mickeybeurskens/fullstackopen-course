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

module.exports = blogsRoute