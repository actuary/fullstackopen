import { createSlice } from '@reduxjs/toolkit'

import { showNotificationTemporarily } from '../reducers/notificationReducer'

import blogService from '../services/blogs'
import loginService from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  },
})

export const { setUser } = userSlice.actions

export const checkExistingLogin = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }
}

export const logOutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    dispatch(setUser(null))
  }
}

export const logInUser = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      dispatch(setUser(user))
      dispatch(showNotificationTemporarily(`Welcome back ${user.name}`, true))
    } catch (err) {
      dispatch(setUser(null))
      dispatch(showNotificationTemporarily("wrong username or password", false))
    }
  }
}

export default userSlice.reducer