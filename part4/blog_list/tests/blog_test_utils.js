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

const getBlogs = async (api) => {
  return await (await api.get('/api/blogs')).body
}

const checkIfBlogsPresent = (returnedBlogs, referenceBlogs) => {
  const authors = returnedBlogs.map(r => r.author)
  referenceBlogs.map(b => {
    expect(authors).toContain(b.author)
  })
}

const resetBlogDB = async () => {
  await Blog.deleteMany({})
  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(note => note.save())
  await Promise.all(promiseArray)
}

module.exports = {
  initialBlogs,
  getBlogs,
  checkIfBlogsPresent,
  resetBlogDB,
}