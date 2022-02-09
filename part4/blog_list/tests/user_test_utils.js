const User = require('../models/user')

const userURI = '/api/users'

const getInitialUsers = async () => {
  return [
    {
      name: 'bestcrow',
      username: 'Paul Paulson',
      passwordHash: 'placeholder',
      blogs: []
    },
    {
      name: 'worstcat',
      username: 'Pakopako',
      passwordHash: 'placeholder',
      blogs: []
    },
    {
      name: 'mediummongoose',
      username: 'Someman',
      passwordHash: 'placeholder',
      blogs: []
    }
  ]
}

const resetUserDB = async () => {
  await User.deleteMany({})
  const users = await getInitialUsers()
  const userObjects = users.map(user => new User(user))
  const promiseArray = userObjects.map(p => p.save())
  await Promise.all(promiseArray)
}

const getUsersFromDB = async (api) => {
  return await (await api.get(userURI)).body
}

const checkIfUsersPresent = (returnedUsers, referenceUsers) => {
  const names = returnedUsers.map(u => u.name)
  referenceUsers.map(u => {
    expect(names).toContain(u.name)
  })
}

const addUserToDB = async (api, user) => {
  await api.post('/api/users')
    .send(user)
    .expect(201)
}

const getUserLoginResponse = async (api, user) => {
  const loginResponse = await api.post('/api/login')
    .send(user)
    .expect(200)
  return loginResponse.body
}

module.exports = {
  userURI,
  getInitialUsers,
  resetUserDB,
  getUsersFromDB,
  addUserToDB,
  checkIfUsersPresent,
  getUserLoginResponse
}