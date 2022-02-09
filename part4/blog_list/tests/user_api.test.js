const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const userTestUtils = require('./user_test_utils')
const api = supertest(app)

beforeEach(async () => {
  await userTestUtils.resetUserDB(api)
})

describe('users api', () => {
  test('adding users', async () => {
    const usersInitial = await userTestUtils.getInitialUsers(api)
    const usersFromDB = await userTestUtils.getUsersFromDB(api)
    expect(usersFromDB.length).toBe(usersInitial.length)
  })
  test('remove users', async () => {
    const usersDBBefore = await userTestUtils.getUsersFromDB(api)
    await api.delete(`${userTestUtils.userURI}/${usersDBBefore[0].id}`)
    const usersDBAfter = await userTestUtils.getUsersFromDB(api)
    expect(usersDBAfter.length).toBe(usersDBBefore.length - 1)
  })
  test('wrong username', async () => {
    const wrongUserName = {
      username: '11',
      name: 'Poepetypah',
      blogs: [],
    }
    await api.post(userTestUtils.userURI)
      .send(wrongUserName)
      .expect(401)
      .expect( { error: 'Password not valid' })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
