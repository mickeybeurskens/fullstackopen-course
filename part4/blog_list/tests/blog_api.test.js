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

const getBlogs = async () => {
  const r = await api.get('/api/blogs')
  const blogs = await r.body
  return blogs
}
const getBlogsLength = async () => {
  const blogs = await getBlogs()
  return blogs.length
}

describe('blog api', () => {
  test('blogs are returned as json format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('first blog authors present', async () => {
    const blogs = await getBlogs()
    const authors = blogs.map(r => r.author)
    initialBlogs.map(b => {
      expect(authors).toContain(b.author)
    })
  })
  test('amount of blogs correct', async () => {
    expect(await getBlogsLength()).toBe(initialBlogs.length)
  })
  test('id keyword is correct', async () => {
    const blogs = await getBlogs()
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
    expect(await getBlogsLength()).toBe(initialBlogs.length + 1)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
