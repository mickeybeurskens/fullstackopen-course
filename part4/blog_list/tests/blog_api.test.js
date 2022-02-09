const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const testUtils = require('./blog_test_utils')
const api = supertest(app)

beforeEach(async () => {
  await testUtils.resetBlogDB()
})

describe('blog /api/blogs', () => {
  test('blogs are returned as json format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('first blog authors present', async () => {
    const blogs = await testUtils.getBlogs(api)
    testUtils.checkIfBlogsPresent(blogs, testUtils.initialBlogs)
  })

  test('amount of blogs correct', async () => {
    const blogs = await testUtils.getBlogs(api)
    expect(blogs.length).toBe(testUtils.initialBlogs.length)
  })

  test('id keyword is correct', async () => {
    const blogs = await testUtils.getBlogs(api)
    blogs.map(blog => {
      expect(blog.id).toBeDefined()
    })
  })

  test('create new post', async () => {
    const newBlog = new Blog({
      title: 'The greatest song in the world',
      author: 'The D',
      url: 'rocketsauce.com',
      likes: 1000
    })
    await newBlog.save()
    const blogs = await testUtils.getBlogs(api)
    expect(blogs.length).toBe(testUtils.initialBlogs.length + 1)
    testUtils.checkIfBlogsPresent(blogs, testUtils.initialBlogs.concat(newBlog))
  })

  test('no likes is zero likes', async () => {
    await Blog.deleteMany({})
    const newBlog = new Blog({
      title: 'No likes?',
      author: 'Unlickable',
      url: 'unluckyluck.com'
    })
    await newBlog.save()
    const blogs = await testUtils.getBlogs(api)
    expect(blogs[0].likes).toBe(0)
  })

  test('response 400 on no url or title', async () => {
    const faultyBlog = {
      id: 1,
      author: 'NotExisting'
    }
    const response = await api.post('/api/blogs', faultyBlog)
    expect(await response.status).toBe(400)
  })
})

describe('blog /api/blogs/id', () => {
  test('deleting by id', async () => {
    const blogs = await testUtils.getBlogs(api)
    const deleteId = blogs[0].id
    await api.delete(`/api/blogs/${deleteId}`)
    const blogsDelete = await testUtils.getBlogs(api)
    expect(blogsDelete.map(b => b.id)).not.toContain(deleteId)
  })

  test('update likes on blog', async () => {
    const blogs = await testUtils.getBlogs(api)
    const updateId = blogs[0].id
    const newLikes = { likes: 300 }
    await api.put(`/api/blogs/${updateId}`).send(newLikes)
    const blogsUpdate = await testUtils.getBlogs(api)
    const updatedBlog = blogsUpdate.find(blog => blog.id === updateId)
    expect(updatedBlog.likes).toBe(newLikes.likes)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
