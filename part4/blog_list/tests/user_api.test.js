const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const testUtils = require('./test_utils')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)


const initUsers = async () => {
  await User.deleteMany({})
  const blogs = await testUtils.getBlogs(api)
  const blogObjects = testUtils.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(note => note.save())
  await Promise.all(promiseArray)
}

const initBlogs = async () => {
  await Blog.deleteMany({})
  const blogObjects = testUtils.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(note => note.save())
  await Promise.all(promiseArray)
}

beforeEach(async () => {
})

describe('blog /api/blogs', () => {
  
})

afterAll(async () => {
  await mongoose.connection.close()
})
