import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import userService from '../services/users'
import logoutService from '../services/logout'
import apiService from '../services/apiservice'


const initialState = null

  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setUser(state, action) {
        const updatedUser = action.payload
        return updatedUser
      }
    }
  })

export const { setUser } = userSlice.actions

export const loginUser = (loginData) => {
  return async dispatch => {
    const user = await loginService.login(loginData)
    dispatch(setUser(user))
    window.localStorage.setItem("loggedUser", JSON.stringify(user))
    apiService.setToken(user.token)
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
  return async dispatch => {
    const userJSON = window.localStorage.getItem("loggedUser")
    if (userJSON) {
      console.log("getUserDatareducer")
      const user = JSON.parse(userJSON)
      apiService.setToken(user.token)
      const userData = await userService.getOne(user.id)
      dispatch(setUser(userData))
    }
    else {
      console.log("not found")
    }

  }
}

export const updateUser = (userObject) => {
  return async dispatch => {
    const updatedUser = await userService.update(userObject)
    dispatch(setUser(updatedUser))
  }
}

export const removeUser = (id) => {
  return async dispatch => {
    await userService.remove(id)
    dispatch(setUser(null))
  }
}
export default userSlice.reducer