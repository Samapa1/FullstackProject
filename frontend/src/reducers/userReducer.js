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
      setUserBookRating(state, action) {
        const newRating = action.payload
        const newStars = newRating.stars
        console.log(JSON.parse(JSON.stringify(state)))
        const userRatings = state.ratings ?? []
        const alreadyRated = state.ratings.find(rating => (rating.bookId === newRating.bookId ))
        if (alreadyRated) {
          const updatedRatings = userRatings.map(rating => (rating.id === alreadyRated.id) ? {...rating, stars: newStars } : rating )
          state.ratings = updatedRatings;
        }
        else {
          state.ratings.push(action.payload)
        }

      },
    }
  })

export const { setUser, setUserBookRating, setUserBookReservation } = userSlice.actions

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

export const removeUser = (userObject) => {
  return async dispatch => {
    await userService.remove(userObject)
    dispatch(setUser(null))
  }
}

export const addUserBookRating = (ratingObject) => {
  return dispatch => {
    dispatch(setUserBookRating(ratingObject))
  }
}

// export const addUserBookReservation= (reservationObject) => {
//   return dispatch => {
//     dispatch(setUserBookReservation(reservationObject))
//   }
// }

export default userSlice.reducer