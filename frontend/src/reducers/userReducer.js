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
      },
      setUserBookRatings(state, action) {
        const { ratingId, stars } = action.payload;
        const userRatings = state.ratings ?? []
        const updatedRatings = userRatings.map(rating => (rating.id === ratingId) ? {...rating, stars } : rating )
        state.ratings = updatedRatings;
      }
    }
  })

export const { setUser, setUserBookRatings } = userSlice.actions

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

export const updateUserBookRating = (ratingId, stars) => {
  return dispatch => {
    dispatch(setUserBookRatings({ ratingId, stars }))
  }
}

export default userSlice.reducer