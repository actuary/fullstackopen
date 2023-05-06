import { useState } from 'react'
import {
  Routes,
  Route,
  Link,
  useMatch
} from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import Notification from './components/Notification'

import LoginForm from './components/LoginForm'
import UserDetails from './components/UserDetails'
import Users from './components/Users'

import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'

import { likeBlog, commentBlog } from './reducers/blogReducer'

const User = ({ user }) => (
  user ?
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog, i) =>
          <li key={`blog_${i}`}>{blog.title}</li>
        )}
      </ul>
    </>
    : null
)

const Header = () => {
  return (
    <>
      <h2>blogs</h2>
      <UserDetails />
    </>
  )
}

const BlogsView = () => {
  const user = useSelector(state => state.user)

  return (
    <>
      {user ?
        <>
          <BlogForm />
          <Blogs />
        </> :
        <LoginForm />
      }
    </>
  )
}

const Blog = ({ blog, doLike, doComment }) => {
  const [comment, setComment] = useState('') 

  return (
    blog ?
      <>
        <h2>{blog.title} by {blog.author}</h2>
        <p>
          <a href={blog.url}>{blog.url}</a><br />
          {blog.likes} likes <button onClick={doLike}>like</button><br />
          added by {blog.user.name}
        </p>
        <h3>comments</h3>
        <input
          type='text'
          id='new-comment'
          value={comment}
          name='Comment'
          onChange={({ target }) => setComment(target.value)}
        />
        <button onClick={() => doComment(comment)}>add comment</button>
        <ul>
          {blog.comments.map((comment, i) =>
            <li key={`comment_${i}`}>{comment}</li>)
          }
        </ul>
      </> : null
  )
}

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  const padding = {
    padding: 5
  }

  const userMatch = useMatch('/users/:id')
  const blogMatch = useMatch('/blogs/:id')

  const selectedUser = userMatch
    ? users.find(u => u.id === userMatch.params.id)
    : null

  const selectedBlog = blogMatch
    ? blogs.find(b => b.id === blogMatch.params.id)
    : null

  return (
    <>
      <Notification />
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/users">users</Link>
        <Link style={padding} to="/blogs">blogs</Link>
        {user ?  <em>{user.name} logged in</em> : <em>not logged in</em>}
      </div>
      {user ? <Header /> : null}
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/users/:id" element={<User user={selectedUser} />} />
        <Route path="/blogs" element={<BlogsView />} />
        <Route path="/blogs/:id" element={
          <Blog 
            blog={selectedBlog} 
            doLike={() => dispatch(likeBlog(selectedBlog))}
            doComment={(comment) => dispatch(commentBlog(selectedBlog, comment))}
          />
        } />
        <Route path="/users" element={<Users />} />
      </Routes>
      <footer>
        <em>Blogs app, DVC </em>
      </footer>
    </>
  )
}

export default App