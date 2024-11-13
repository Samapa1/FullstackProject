import { createSlice } from '@reduxjs/toolkit'
import reservationService from '../services/reservations'

const initialState = []

  const reservationSlice = createSlice({
    name: 'reservations',
    initialState,
    reducers: {
      appendReservation(state, action) {
        state.push(action.payload)
      },
      deleteReservation(state, action) {
        const id = action.payload
        const reservations = state.filter (reservation => reservation.id !== id)
        return reservations
      }
    },
  })

export const { appendReservation, deleteReservation } = reservationSlice.actions


export const addReservation = (reservationData) => {
    return async dispatch => {
      console.log(reservationData)
      const reservation = await reservationService.create(reservationData)
      dispatch(appendReservation(reservation))
    }
  }

export const removeReservation = (id) => {
  return async dispatch => {
    await reservationService.remove(id)
    dispatch(deleteReservation(id))
  }
}

export const collectReservation = (data) => {
  return async dispatch => {
    await reservationService.collect(data)
    dispatch(deleteReservation(data.reservationId))
  }
}

export default reservationSlice.reducer