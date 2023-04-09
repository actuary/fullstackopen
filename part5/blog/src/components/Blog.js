import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, deleteBlog, updateBlog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    await blogService.likeBlog({...blog, user:blog.user.id, likes: blog.likes + 1})
    setLikes(likes + 1)
    updateBlog({...blog, likes: likes})
  }

  const handleRemove = async () => {
    const response = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (response) {
      await blogService.deleteBlog(blog)
      deleteBlog(blog)
    }
  }

  const fullDetails = () => (
    <>
      <div>
        {blog.url}
      </div>
      <div>
        likes {likes} <button onClick={handleLike}>like</button>
      </div>
      <div>
        {blog.user.name}
      </div>
      { user && user.username === blog.user.username ? <button onClick={handleRemove}>Remove</button>: <></>}
    </>
  )
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} by {blog.author} 
        <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? "hide" : "show"}</button> 
      </div>
      {showDetails ? fullDetails() : <></>}
    </div>  
  )
}

export default Blog