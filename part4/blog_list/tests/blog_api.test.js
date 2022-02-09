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

const checkIfContains = (returnedBlogs, referenceBlogs) => {
  const authors = returnedBlogs.map(r => r.author)
  referenceBlogs.map(b => {
    expect(authors).toContain(b.author)
  })
}

describe('blog api', () => {
  test('blogs are returned as json format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('first blog authors present', async () => {
    const blogs = await (await api.get('/api/blogs')).body
    checkIfContains(blogs, initialBlogs)
  })

  test('amount of blogs correct', async () => {
    const blogs = await (await api.get('/api/blogs')).body
    expect(blogs.length).toBe(initialBlogs.length)
  })

  test('id keyword is correct', async () => {
    const blogs = await (await api.get('/api/blogs')).body
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
    const blogs = await (await api.get('/api/blogs')).body
    expect(blogs.length).toBe(initialBlogs.length + 1)
    checkIfContains(blogs, initialBlogs.concat(newBlog))
  })

  test('no likes is zero likes', async () => {
    await Blog.deleteMany({})
    const newBlog = new Blog({
      title: 'No likes?',
      author: 'Unlickable',
      url: 'unluckyluck.com'
    })
    await newBlog.save()
    const blogs = await(await api.get('/api/blogs')).body
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

afterAll(async () => {
  await mongoose.connection.close()
})
