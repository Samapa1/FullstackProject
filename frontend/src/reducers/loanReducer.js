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
        console.log(JSON.parse(JSON.stringify(state)))
        const id = action.payload;
        const updatedLoans = state.filter (loan => loan.id !== id)
        return updatedLoans
      },
      renew(state, action) {
        console.log(JSON.parse(JSON.stringify(state)))
        const updatedLoan = action.payload;
        const updatedLoans = state.map(loan => (loan.id === updatedLoan.id) ? updatedLoan : 
      loan )
        return updatedLoans
      },

    },
  })

export const { setLoans, appendLoan, deleteLoan, renew } = loanSlice.actions

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

export const renewLoan = (updatedObject) => {
  return async dispatch => {
   const updatedLoan = await loanService.update(updatedObject)
   console.log(updatedLoan)
   dispatch(renew(updatedLoan))
  }
}


export default loanSlice.reducer
