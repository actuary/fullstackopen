import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

import Togglable from './Togglable'

const BlogForm = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addNewBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

    dispatch(createBlog(title, author, url))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Togglable buttonLabel='create blog' ref={blogFormRef}>
      <h2>create new</h2>
      <form onSubmit={addNewBlog}>
        <div>
          title
          <input
            type="text"
            id="new-blog-title"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            id="new-blog-author"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            id="new-blog-url"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create-new-blog" type="submit">create</button>
      </form>
    </Togglable>

  )
}

export default BlogForm