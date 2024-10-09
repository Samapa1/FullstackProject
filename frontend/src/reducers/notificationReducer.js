import { createSlice } from '@reduxjs/toolkit'

const initialState = { data: null, type: 'info' }
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action) {
      console.log("setMessage")
      console.log(action.payload)
      return action.payload
    },
    removeMessage() {
      return initialState
    },
  },
})

export const { setMessage, removeMessage } = notificationSlice.actions

export const setNotification = (message, timeout) => {
  return async (dispatch) => {
    dispatch(setMessage(message))
    setTimeout(() => {
      dispatch(removeMessage())
    }, timeout)
  }
}

export default notificationSlice.reducer;