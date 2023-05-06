import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from "react-router-dom"

import { initializeUsers } from '../reducers/populationReducer'

const UserRow = ({ user }) => (
  <tr>
    <td>
      <Link to={`/users/${user.id}`}>
        {user.name}
      </Link>
    </td>
    <td>{user.blogs.length}</td>
  </tr>
)


const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr><th></th><th>blogs created</th></tr>
          {users.map((user) => <UserRow key={user.id} user={user} />)}
        </tbody>
      </table>
    </>
  )
}

export default Users