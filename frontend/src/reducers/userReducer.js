import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import loanService from '../services/loans'
import reservationService from '../services/reservations'
import userService from '../services/users'
import logoutService from '../services/logout'

const initialState = null

  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setUser(state, action) {
        const updatedUser = action.payload
        return updatedUser
      },
    }
  })

export const { setUser } = userSlice.actions

export const loginUser = (loginData) => {
  return async dispatch => {
    const user = await loginService.login(loginData)
    dispatch(setUser(user))
    window.localStorage.setItem("loggedUser", JSON.stringify(user))
    loanService.setToken(user.token)
    reservationService.setToken(user.token)
    userService.setToken(user.token)
    logoutService.setToken(user.token)
  }
}

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem("loggedUser")
    await logoutService.logout()
    dispatch(setUser(null))
  }
}

export const getUserData = () => {
  console.log("getUserData")
  return async dispatch => {
    const userJSON = window.localStorage.getItem("loggedUser")
    if (userJSON) {
      const user = JSON.parse(userJSON)
      const userData = await userService.getOne(user.id)
      dispatch(setUser(userData))
      loanService.setToken(user.token)
      reservationService.setToken(user.token)
      userService.setToken(user.token)
      logoutService.setToken(user.token)

    }
    else {
      console.log("not found")
    }

  }
}

  export const updateUser = (userObject) => {
    return async dispatch => {
      console.log(userObject)
      const updatedUser = await userService.update(userObject)
      dispatch(setUser(updatedUser))
    }
  }

export default userSlice.reducer