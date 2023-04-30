import { useDispatch, useSelector } from 'react-redux'

import { logOutUser } from '../reducers/userReducer'

const UserDetails = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  return (
    <div>
      {user.name} is logged in
      <button onClick={() => dispatch(logOutUser())}>Log out</button>
    </div>
  )
}

export default UserDetails