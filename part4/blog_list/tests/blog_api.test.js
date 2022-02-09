const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const initialBlogs = [
  {
    title: 'Fishing is the best',
    author: 'Fishmaster 500',
    url: 'fishing101.com',
    likes: 4
  },
  {
    title: 'Cat is the best',
    author: 'Catmaster 2',
    url: 'cats.com',
    likes: 9
  },
  {
    title: 'Dogs are awesome',
    author: 'GoodBoy',
    url: 'dogs.com',
    likes: 25
  },
]
beforeEach(async () => {
  await Blog.deleteMany({})
  let noteObject = new Blog(initialBlogs[0])
  await noteObject.save()
  noteObject = new Blog(initialBlogs[1])
  await noteObject.save()
})

test('blogs are returned as json format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 10000)

afterAll(async () => {
  await mongoose.connection.close()
})