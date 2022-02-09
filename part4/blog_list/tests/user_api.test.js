const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const userTestUtils = require('./user_test_utils')
const api = supertest(app)

beforeEach(async () => {
  await userTestUtils.resetUserDB(api)
})

describe('users /api/blogs', () => {
  test('adding users', async () => {
    const usersInitial = await userTestUtils.getUsersFromDB(api)
    const usersFromDB = await userTestUtils.getInitialUsers(api)
    expect(usersFromDB.length).toBe(usersInitial.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
