const usersRoute = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

const passWordValid = (password) => {
  const minPassLength = 3
  if (password === 'undefined'){
    return 'Password not valid'
  }
  if (password.length < minPassLength) {
    return `Password ${password} should be at least ${minPassLength} characters long`
  }
  return ''
}

usersRoute.get('/', async (request, response) => {
  const blogs = await User.find({}).populate('blogs',
    { title: 1, likes: 1 })
  response.json(blogs)
})

usersRoute.post('/', async (request, response) => {
  const body = request.body
  const errorMessage = passWordValid(body.password)
  if (errorMessage !== '') {
    response.status(400).json({ error: errorMessage })
    return
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  const blog = new User({
    username: body.username,
    name: body.name,
    passwordHash: passwordHash
  })

  const resultBlog = await blog.save()
  response.status(201).json(resultBlog)
})

usersRoute.delete('/:id', async (request, response) => {
  const id = request.params.id
  await User.findByIdAndRemove(id)
  response.status(204).end()
})

module.exports = usersRoute