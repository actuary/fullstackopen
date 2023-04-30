import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
    unsetMessage(state) {
      return null
    }
  },
})

export const { setMessage, unsetMessage } = notificationSlice.actions

export const showNotificationTemporarily = (message, success) => {
  return async dispatch => {
    dispatch(setMessage({ message, success }))

    setTimeout(() => {
      dispatch(unsetMessage())
    }, 5000)
  }
}


export default notificationSlice.reducer