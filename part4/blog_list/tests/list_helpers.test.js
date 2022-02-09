const listHelper = require('../utils/list_helpers')

test('Dummy test for testing testing', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})