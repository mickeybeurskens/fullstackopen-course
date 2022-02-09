const usersRoute = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

const passWordValid = (password, response) => {
  const minPassLength = 3
  if (!password){
    response.status(401).send({ error: 'Password not valid' })
    return false
  }
  if (password.length < minPassLength) {
    response.status(401).send({ error: `Password ${password}
      should be at least ${minPassLength} characters long` })
    return false
  }
  return true
}

usersRoute.get('/', async (request, response) => {
  const blogs = await User.find({})
  response.json(blogs)
})

usersRoute.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  if (!passWordValid(body.password)) {return}
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