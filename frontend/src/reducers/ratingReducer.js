import { createSlice } from '@reduxjs/toolkit'
import ratingService from '../services/ratings'

const initialState = []

  const ratingSlice = createSlice({
    name: 'ratings',
    initialState,
    reducers: {
      addBookRating(state, action){
        console.log(JSON.parse(JSON.stringify(state)))
        const newRating = action.payload
        const alreadyRated = state.find(rating => rating.bookId === newRating.bookId)
        if (alreadyRated) {
          const updatedRatings = state.map(rating => (rating.id === newRating.id) ? newRating : rating )
          return updatedRatings
        }
        state.push(action.payload)
      },
      setRatings(state, action) {
        return action.payload
      },
      removeBookRating(state, action) {
        const id = action.payload
        const updatedRatings = state.filter(rating => rating.id !== id)
        return updatedRatings
      },
    },
  })

export const { addBookRating, setRatings, removeBookRating} = ratingSlice.actions

export const addRating = (newObject) => {
    return async dispatch => {
      const rating = await ratingService.create(newObject)
      dispatch(addBookRating(rating))
    }
}

export const getRatings = () => {
    return async dispatch => {
      const ratings = await ratingService.getAll()
      dispatch(setRatings(ratings))
    }
}

export const removeRating = (id) => {
  return async dispatch => {
    await ratingService.remove(id)
    dispatch(removeBookRating(id))
  }
}

export default ratingSlice.reducer