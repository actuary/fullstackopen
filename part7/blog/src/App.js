import { useRef } from 'react'
import { useSelector } from 'react-redux'

import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import UserDetails from './components/UserDetails'

import Notification from './components/Notification'
import Togglable from './components/Togglable'

import LoginForm from './components/LoginForm'

const GlobalView = () => {
  const user = useSelector(state => state.user)
  const blogFormRef = useRef()

  return (
    <>
      <h2>blogs</h2>
      {user ?
        <>
          <UserDetails />
          <br />
          <Togglable buttonLabel='create blog' ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef} />
          </Togglable>
          <br />
          <Blogs />
        </> :
        <LoginForm />
      }
    </>
  )
}

const App = () => {
  return (
    <>
      <Notification />
      <GlobalView />
    </>
  )
}

export default App