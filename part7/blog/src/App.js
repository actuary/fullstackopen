import { useSelector } from 'react-redux'

import Notification from './components/Notification'

import LoginForm from './components/LoginForm'
import UserDetails from './components/UserDetails'

import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'


const GlobalView = () => {
  const user = useSelector(state => state.user)

  return (
    <>
      <h2>blogs</h2>
      {user ?
        <>
          <UserDetails />
          <br />
          <BlogForm />
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