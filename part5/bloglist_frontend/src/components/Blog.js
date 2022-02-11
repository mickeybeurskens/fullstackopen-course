import React from 'react'
const Blog = ({blog}) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)

const CurrentUser = (user) => (
  <div>
    <p>Logged in as {user.username}</p>
  </div>
)

const BlogSection = ({blogs, user}) => (
  <div>
    <h2>blogs</h2>
    {user !== null && CurrentUser(user)}
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </div>
)
export default BlogSection