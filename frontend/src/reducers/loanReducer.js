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
        return state
      },
      deleteLoan(state, action) {
        const id = action.payload;
        const updatedLoans = state.filter (loan => loan.id !== id)
        return updatedLoans
      }
    },
  })

export const { setLoans, appendLoan, deleteLoan } = loanSlice.actions

export const initializeLoans = () => {
  return async dispatch => {
    const loans = await loanService.getAll()
    dispatch(setLoans(loans))
  }
}

export const addLoan = (newObject) => {
    return async dispatch => {
      console.log("loanreducer")
      const loan = await loanService.create(newObject)
      console.log(loan)
      dispatch(appendLoan(loan))
    }
  }

export const removeLoan = (id) => {
  return async dispatch => {
    await loanService.remove(id)
    dispatch(deleteLoan(id))
  }
}


export default loanSlice.reducer
