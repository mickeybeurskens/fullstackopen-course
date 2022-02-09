const blogsRoute = require('express').Router()
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
  if (!request.user) {
    return tokenError(response)
  }
  const user = await User.findById(request.user.id)
  const blog = new Blog({ ...request.body, user: user.id })

  const resultBlog = await blog.save()
  response.status(201).json(resultBlog)
})

blogsRoute.delete('/:id', async (request, response) => {
  if (!request.user) {
    return tokenError(response)
  }
  const blogId = request.params.id
  const blog = await Blog.findById(blogId)
  if (request.user.id.toString() !== blog.user.toString()) {
    response.status(401)
      .json({ error: 'You cannot delete blogs that are not yours' })
  }
  await Blog.findByIdAndDelete(blogId)
  response.status(204).end()
})

blogsRoute.put('/:id', async (request, response) => {
  const id = request.params.id
  const likes = { likes: request.body.likes }
  const newBlog = await Blog.findByIdAndUpdate(id, likes)
  response.json(newBlog)
})

module.exports = blogsRoute