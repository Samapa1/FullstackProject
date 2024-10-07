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
      },
      setUserLoans(state, action) {
        return action.payload
      }
    }
  })

export const { setUser, setUserLoans } = userSlice.actions

export const loginUser = (loginData) => {
  return async dispatch => {
    const user = await loginService.login(loginData)
    dispatch(setUser(user))
    window.localStorage.setItem("loggedUser", JSON.stringify(user))
    loanService.setToken(user.token)
    // console.log(user)
    // console.log(JSON.parse(window.localStorage.getItem("loggedUser")))
  }
}

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem("loggedUser")
    dispatch(setUser(null))
  }
}

export const initializeUser = () => {
  return async dispatch => {
    const userJSON = window.localStorage.getItem("loggedUser")
    if (userJSON) {
      const user = JSON.parse(userJSON)
      loanService.setToken(user.token)
      const userData = await userService.getOne(user.id)
      dispatch(setUser(userData))
    }
    else {
      console.log("not found")
    }

  }
}


export const getUserLoans = () => {
  return async dispatch => {
    const userJSON = window.localStorage.getItem("loggedUser")
    if (userJSON) {
      const user = JSON.parse(userJSON)
      const userData = await userService.getOne(user.id)
      console.log("calling getuserloans")
      console.log(userData)
      dispatch(setUserLoans(userData))
    }
    else {
      console.log("not found")
    }

  }
}

export default userSlice.reducer