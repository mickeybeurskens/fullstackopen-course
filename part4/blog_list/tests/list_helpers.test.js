const listHelper = require('../utils/list_helpers')

test('Dummy test for testing testing', () => {
  const result = listHelper.dummy()
  expect(result).toBe(1)
})

const listWithOneBlog = [
  {
    title: 'How to catch a dog',
    author: 'Me',
    likes: 3,
  },
]

const listWithMoreBlogs = [
  {
    title: 'How to catch a dog',
    author: 'Me',
    likes: 3,
  },
  {
    title: 'How to catch a fish',
    author: 'Me',
    likes: 7,
  },
]

describe('total likes', () => {
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

describe('favorite blog', () => {
  test('equals favorite of one blog', () => {
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(listWithOneBlog[0])
  })
  test('equals favorite of multiple blogs', () => {
    expect(listHelper.favoriteBlog(listWithMoreBlogs)).toEqual(listWithMoreBlogs[1])
  })
  test('equals favorite of no blogs', () => {
    expect(listHelper.favoriteBlog([])).toEqual({})
  })
})

describe('most blogs', () => {
  test('equals favorite of one blog', () => {
    expect(listHelper.mostBlogs(listWithOneBlog)).toEqual({
      author: 'Me',
      blogs: 1
    })
  })
  test('equals favorite of multiple blogs', () => {
    expect(listHelper.mostBlogs(listWithMoreBlogs)).toEqual({
      author: 'Me',
      blogs: 2
    })
  })
  test('equals favorite of no blogs', () => {
    expect(listHelper.mostBlogs([])).toEqual({})
  })
})

describe('most likes', () => {
  test('equals favorite of one blog', () => {
    expect(listHelper.mostLikes(listWithOneBlog)).toEqual({
      author: 'Me',
      likes: 3
    })
  })
  test('equals favorite of multiple blogs', () => {
    expect(listHelper.mostLikes(listWithMoreBlogs)).toEqual({
      author: 'Me',
      likes: 10
    })
  })
  test('equals favorite of no blogs', () => {
    expect(listHelper.mostLikes([])).toEqual({})
  })
})