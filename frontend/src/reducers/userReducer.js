import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import loanService from '../services/loans'
import userService from '../services/users'

const initialState = []

  const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
      setUser(state, action) {
        return action.payload
      },
      setUserData(state, action) {
        return action.payload
      }
    }
  })

export const { setUser, setUserData } = userSlice.actions

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


export const getUserData = () => {
  return async dispatch => {
    const userJSON = window.localStorage.getItem("loggedUser")
    if (userJSON) {
      const user = JSON.parse(userJSON)
      console.log(user.id)
      const userData = await userService.getOne(user.id)
      dispatch(setUserData(userData))
    }
    else {
      console.log("not found")
    }

  }
}

export default userSlice.reducer