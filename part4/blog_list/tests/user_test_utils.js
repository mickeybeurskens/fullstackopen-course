const blogTestUtils = require('./blog_test_utils')
const User = require('../models/user')

const getInitialUsers = async (api) => {
  const blogs = await blogTestUtils.getBlogs(api)
  return [
    {
      name: 'bestcrow',
      username: 'Paul Paulson',
      passwordHash: 'placeholder',
      blogs: [blogs[0].id]
    },
    {
      name: 'worstcat',
      username: 'Pakopako',
      passwordHash: 'placeholder',
      blogs: [blogs[1].id, blogs[2].id]
    },
    {
      name: 'mediummongoose',
      username: 'Someman',
      passwordHash: 'placeholder',
      blogs: []
    }
  ]
}

const resetUserDB = async (api) => {
  await User.deleteMany({})
  const users = await getInitialUsers(api)
  const userObjects = users.map(user => new User(user))
  const promiseArray = userObjects.map(p => p.save())
  await Promise.all(promiseArray)
}

const getUsersFromDB = async (api) => {
  return await (await api.get('/api/users')).body
}

const checkIfUsersPresent = (returnedUsers, referenceUsers) => {
  const names = returnedUsers.map(u => u.name)
  referenceUsers.map(u => {
    expect(names).toContain(u.name)
  })
}

module.exports = {
  getInitialUsers,
  resetUserDB,
  getUsersFromDB,
  checkIfUsersPresent
}