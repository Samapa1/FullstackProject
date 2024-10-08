import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import loanService from '../services/loans'
import userService from '../services/users'

const initialState = null

  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setUser(state, action) {
        return action.payload
      }
    }
  })

export const { setUser } = userSlice.actions

export const loginUser = (loginData) => {
  return async dispatch => {
    const user = await loginService.login(loginData)
    dispatch(setUser(user))
    window.localStorage.setItem("loggedUser", JSON.stringify(user))
    loanService.setToken(user.token)
  }
}

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem("loggedUser")
    dispatch(setUser(null))
  }
}

export const getUserData = () => {
  return async dispatch => {
    const userJSON = window.localStorage.getItem("loggedUser")
    if (userJSON) {
      const user = JSON.parse(userJSON)
      const userData = await userService.getOne(user.id)
      console.log(userData)
      dispatch(setUser(userData))
    }
    else {
      console.log("not found")
    }

  }
}

export default userSlice.reducer