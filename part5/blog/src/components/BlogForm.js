import { useState } from 'react'

  const BlogForm = ({ createNewBlog , blogFormRef}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addNewBlog = async (event) => {
      event.preventDefault()
      blogFormRef.current.toggleVisibility()

      await createNewBlog(title, author, url)
      setTitle('')
      setAuthor('')
      setUrl('')
    }
    return (
      <>
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
      </>
    )
  }

  export default BlogForm