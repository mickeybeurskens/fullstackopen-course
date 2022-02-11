import React, { useState, useEffect } from 'react'
import BlogSection from './components/Blog'
import LoginForm from './components/Login'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userReturned = await loginService.login({
        username, password
      })
      setUser(userReturned)
      setUserName('')
      setPassword('')
    } catch (exception) {

    }
  }

  return (
    <div>
      {user === null ? 
      LoginForm({username, password, handleLogin,
        setUserName, setPassword}) :
      BlogForm()}
      <BlogSection blogs={blogs} user={user}/>
    </div>
  )
}

export default App