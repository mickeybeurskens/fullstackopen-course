const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const blogUtils = require('./blog_test_utils')
const userUtils = require('./user_test_utils')
const api = supertest(app)

beforeEach(async () => {
  await blogUtils.resetBlogDB()
  await userUtils.resetUserDB(api)
})

describe('blog', () => {
  test('blogs are returned as json format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('first blog authors present', async () => {
    const blogs = await blogUtils.getBlogs(api)
    blogUtils.checkIfBlogsPresent(blogs, blogUtils.initialBlogs)
  })

  test('amount of blogs correct', async () => {
    const blogs = await blogUtils.getBlogs(api)
    expect(blogs.length).toBe(blogUtils.initialBlogs.length)
  })

  test('id keyword is correct', async () => {
    const blogs = await blogUtils.getBlogs(api)
    blogs.map(blog => {
      expect(blog.id).toBeDefined()
    })
  })

  test('create new post', async () => {
    const newBlog = {
      title: 'The greatest song in the world',
      author: 'The D',
      url: 'rocketsauce.com',
      likes: 1000
    }
    await blogUtils.addBlogWithNewUser(api, newBlog)
    const blogs = await blogUtils.getBlogs(api)
    expect(blogs.length).toBe(blogUtils.initialBlogs.length + 1)
    blogUtils.checkIfBlogsPresent(blogs, blogUtils.initialBlogs.concat(newBlog))
  })

  test('no likes is zero likes', async () => {
    await Blog.deleteMany({})
    const newBlog = {
      title: 'No likes?',
      author: 'Unlickable',
      url: 'unluckyluck.com'
    }
    await blogUtils.addBlogWithNewUser(api, newBlog)
    const blogs = await blogUtils.getBlogs(api)
    expect(blogs[0].likes).toBe(0)
  })

  test('response 400 on no url or title', async () => {
    const faultyBlog = {
      id: 1,
      author: 'NotExisting'
    }
    const response = await blogUtils.addBlogWithNewUser(api, faultyBlog)
    expect(await response.status).toBe(400)
  })
})

describe('blog id api', () => {
  test('deleting by id', async () => {
    const newBlog = {
      title: 'The greatest song in the world',
      author: 'The D',
      url: 'rocketsauce.com',
      likes: 1000
    }
    const newUser = blogUtils.getNewUserObject()
    const response = await blogUtils.addBlog(api, newBlog, newUser)
    const blogId = response.body.id
    const loginInfo = await userUtils.getUserLoginResponse(api, newUser)
    await api.delete(`/api/blogs/${blogId}`)
      .set({ Authorization: `bearer ${loginInfo.token}` })
      .expect(204)
    const blogsDelete = await blogUtils.getBlogs(api)
    expect(blogsDelete.map(b => b.id)).not.toContain(blogId)
  })

  test('update likes on blog', async () => {
    const blogs = await blogUtils.getBlogs(api)
    const updateId = blogs[0].id
    const newLikes = { likes: 300 }
    await api.put(`/api/blogs/${updateId}`).send(newLikes).expect(200)
    const blogsUpdate = await blogUtils.getBlogs(api)
    const updatedBlog = blogsUpdate.find(blog => blog.id === updateId)
    expect(updatedBlog.likes).toBe(newLikes.likes)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
