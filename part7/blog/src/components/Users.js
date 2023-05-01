import { useState, useEffect } from 'react'

import { Link } from "react-router-dom"

import userService from '../services/users'

const Users = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    userService
      .getAllUsers()
      .then(users => setUsers(users))
  }, [])

  return (
    <>
      <h2>Users</h2>
      <table>
        <tr><th></th><th>blogs created</th></tr>
        {users.map((user) =>
          <tr>
            <td>
              <Link to={`/users/${user.id}`}>
                {user.name}
              </Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>)}
      </table>
    </>
  )
}

export default Users