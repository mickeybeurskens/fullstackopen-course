const listHelper = require('../utils/list_helpers')

test('Dummy test for testing testing', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('Total likes', () => {
  const listWithOneBlog = [
    {
      _id: '61fd238d19e8ffb591e65c55',
      title: 'How to catch a dog',
      author: 'Me',
      url: 'https://tocatchadog.com',
      likes: 3,
      __v: 0
    },
  ]

  const listWithMoreBlogs = [
    {
      _id: '61fd238d19e8ffb591e65c55',
      title: 'How to catch a dog',
      author: 'Me',
      url: 'https://tocatchadog.com',
      likes: 3,
      __v: 0
    },
    {
      _id: '61fd1469ae449148ebca0dc9',
      title: 'How to catch a fish',
      author: 'Me',
      url: 'https://tocatchafish.com',
      likes: 7,
      __v: 0
    },
  ]

  test('equals like of one blog', () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(listWithOneBlog[0].likes)
  })
  test('equals like of multiple blogs', () => {
    expect(listHelper.totalLikes(listWithMoreBlogs)).toBe(10)
  })
  test('equals like of no blogs', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })
})