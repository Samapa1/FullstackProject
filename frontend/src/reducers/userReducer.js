import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import loanService from '../services/loans'

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
    window.localStorage.setItem("loggedUser", JSON.stringify(user))
    loanService.setToken(user.token)
    console.log(user)
    console.log(JSON.parse(window.localStorage.getItem("loggedUser")))
  }
}

export const initializeUser = () => {
  return async dispatch => {
    const userJSON = window.localStorage.getItem("loggedUser")
    if (userJSON) {
      const user = JSON.parse(userJSON)
      dispatch(setUser(user))
      loanService.setToken(user.token);
    }
    else {
      console.log("not found")
    }

  }
}

export default userSlice.reducer