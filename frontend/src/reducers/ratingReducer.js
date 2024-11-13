import { createSlice } from '@reduxjs/toolkit'
import ratingService from '../services/ratings'

const initialState = []

  const ratingSlice = createSlice({
    name: 'ratings',
    initialState,
    reducers: {
      appendRating(state, action){
        state.push(action.payload)
      },
      setRatings(state, action) {
        return action.payload
      },
      updateRatings(state, action) {
        const updatedRating = action.payload
        const updatedRatings = state.map(rating => (rating.id === updatedRating.id) ? updatedRating : rating )
        return updatedRatings
      }
    },
  })

export const { appendRating, setRatings, updateRatings } = ratingSlice.actions

export const addRating = (newObject) => {
    return async dispatch => {
      const rating = await ratingService.create(newObject)
      dispatch(appendRating(rating))
    }
}

export const getRatings = () => {
    return async dispatch => {
      const ratings = await ratingService.getAll()
      dispatch(setRatings(ratings))
    }
}

export const updateRating = (updatedObject) => {
  return async dispatch => {
    const updatedRating = await ratingService.update(updatedObject)
    dispatch(updateRatings(updatedRating))
  }
}
export default ratingSlice.reducer