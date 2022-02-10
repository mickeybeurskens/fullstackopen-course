import React, { useState, useEffect } from 'react'
import BlogSection from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/Login'
import BlogForm from './components/BlogForm'

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

  return (
    <div>
      {user === null ? LoginForm() : BlogForm()}
      <BlogSection blogs={blogs}/>
    </div>
  )
}

export default App