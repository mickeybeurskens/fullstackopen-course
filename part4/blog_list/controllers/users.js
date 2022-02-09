const usersRoute = require('express').Router()
const User = require('../models/user')

usersRoute.get('/', async (request, response) => {
  const blogs = await User.find({})
  response.json(blogs)
})

usersRoute.post('/', async (request, response) => {
  const blog = new User(request.body)

  const resultBlog = await blog.save()
  response.status(201).json(resultBlog)
})

usersRoute.delete('/:id', async (request, response) => {
  const id = request.params.id
  await User.findByIdAndRemove(id)
  response.status(204).end()
})

module.exports = usersRoute