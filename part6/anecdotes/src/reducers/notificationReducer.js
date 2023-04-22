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
export default notificationSlice.reducer

