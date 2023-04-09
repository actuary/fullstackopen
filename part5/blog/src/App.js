import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(sortedBlogs(blogs))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const sortedBlogs = (blogs) => blogs.sort((blogA, blogB) => blogB.likes - blogA.likes)

  const updateBlog = (blog) => {
    const newBlogList = blogs.filter(b => b.id !== blog.id).concat(blog)
    setBlogs(sortedBlogs(newBlogList))
  }

  const removeBlog = (blog) => {
    setBlogs(blogs.filter(b => b.id !== blog.id))
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ "username": username, "password": password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage({
        message: `Welcome back ${user.name}`,
        success: true
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      console.log(user.username + ' logged in')
    } catch (err) {
      console.log('error: ' + err)
      setMessage({
        message: "wrong username or password",
        success: false
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }
  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const createNewBlog = async (title, author, url) => {

    try {
      const newBlog = await blogService.createBlog({ title, author, url })
      setBlogs(sortedBlogs(blogs.concat(newBlog)))
      setMessage({
        message: `added ${title} by ${author}`,
        success: false
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      console.log('created blog')
      console.log(newBlog)
    } catch (err) {
      console.log('Error creating blog ' + err)
      setMessage({
        message: "Failed to create blog",
        success: false
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
  const userInfoDisplay = () => (
    <div>{user.name} is logged in  <button onClick={handleLogout}>Log out</button></div>
  )
  const blogDisplay = () => (
    <>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} updateBlog={updateBlog} deleteBlog={removeBlog}/>
      )}
    </>
  )

  const BlogForm = ({ createNewBlog }) => {
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
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author
            <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url
            <input
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </>
    )
  }

  const createBlogForm = () => (
    <Togglable buttonLabel='create blog' ref={blogFormRef}>
      <BlogForm createNewBlog={createNewBlog}/>
    </Togglable>
  )

  return (
    <>
      <Notification message={message} />
      <h2>blogs</h2>
      {!user && loginForm()}
      {user && <>
        {userInfoDisplay()}
        <br />
        {createBlogForm()}
        <br />
        {blogDisplay()}
      </>
      }
    </>
  )
}

export default App