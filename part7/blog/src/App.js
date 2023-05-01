import {
  Routes,
  Route,
  Link,
} from "react-router-dom"

import { useSelector } from 'react-redux'

import Notification from './components/Notification'

import LoginForm from './components/LoginForm'
import UserDetails from './components/UserDetails'
import Users from './components/Users'

import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'

const User = (user) => {
  console.log(user)
  return (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog =>
          <li>{blog.title}</li>
        )}
      </ul>
    </>
  )
}

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

const App = () => {
  const user = useSelector(state => state.user)

  const padding = {
    padding: 5
  }

  return (
    <>
      <Notification />
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/users">users</Link>
        <Link style={padding} to="/blogs">blogs</Link>
      </div>
      {user ? <Header /> : null}
      <Routes>
        <Route path="/users/:id" element={<User user={user} />} />
        <Route path="/blogs" element={<BlogsView />} />
        <Route path="/users" element={<Users />} />
      </Routes>
      <footer>
        <em>Blogs app, DVC </em>
      </footer>
    </>
  )
}

export default App