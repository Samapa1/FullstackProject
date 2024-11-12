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
      setRatings(state,action) {
        return action.payload
      }
    },
  })

export const { appendRating, setRatings } = ratingSlice.actions

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

export default ratingSlice.reducer