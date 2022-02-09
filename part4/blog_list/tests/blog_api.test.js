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
  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(note => note.save())
  await Promise.all(promiseArray)
})

describe('blog api', () => {
  test('blogs are returned as json format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('first blog authors present', async () => {
    const response = await api
      .get('/api/blogs')
    const authors = response.body.map(r => r.author)
    initialBlogs.map(b => {
      expect(authors).toContain(b.author)
    })
  })
  test('amount of blogs correct', async () => {
    const response = await api
      .get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
