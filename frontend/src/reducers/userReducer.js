import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const initialState = []

  const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
      setUser(state, action) {
        return action.payload
      }
    },
      updateUser(state, action) {
        return action.payload
      }
  })

export const { setUser, updateUser } = userSlice.actions

export const loginUser = (loginData) => {
  return async dispatch => {
    const user = await loginService.login(loginData)
    dispatch(setUser(user))
  }
}


export default userSlice.reducer