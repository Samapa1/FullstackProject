import { createSlice } from '@reduxjs/toolkit'
import reservationService from '../services/reservations'

const initialState = []

  const reservationSlice = createSlice({
    name: 'reservations',
    initialState,
    reducers: {
      appendReservation(state, action) {
        state.push(action.payload)
      }
    },
  })

export const { appendReservation } = reservationSlice.actions


export const addReservation = (reservationData) => {
    return async dispatch => {
      console.log(reservationData)
      const reservation = await reservationService.create(reservationData)
      dispatch(appendReservation(reservation))
    }
  }


export default reservationSlice.reducer