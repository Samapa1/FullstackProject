import { createSlice } from '@reduxjs/toolkit'
import loanService from '../services/loans'

const initialState = []

  const loanSlice = createSlice({
    name: 'loans',
    initialState,
    reducers: {
      setLoans(state, action) {
        return action.payload
      },
      appendLoan(state, action) {
        state.push(action.payload)
      }
    },
  })

export const { setLoans, appendLoan } = loanSlice.actions

export const initializeLoans = () => {
  return async dispatch => {
    const loans = await loanService.getAll()
    dispatch(setLoans(loans))
  }
}

export const addLoan = (newObject) => {
    return async dispatch => {
      const loan = await loanService.create(newObject)
      dispatch(appendLoan(loan))
    }
  }

export default loanSlice.reducer
