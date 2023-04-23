import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  show: false
}
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    updateNotification(state, action) {
      return {
        ...state,
        message: action.payload
      }
    },
    showNotification(state, action) {
      return {
        ...state,
        show: true
      }
    },
    hideNotification(state, action) {
      return {
        ...state,
        show: false
      }
    }
  }
})

export const { updateNotification, showNotification, hideNotification } = notificationSlice.actions

export const setNotification = (message, timeout) => {
  return async dispatch => {
    dispatch(updateNotification(message))
    dispatch(showNotification())
    setTimeout(() => dispatch(hideNotification()), timeout * 1000)
  }
}

export default notificationSlice.reducer

