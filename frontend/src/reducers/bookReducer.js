import { createSlice } from '@reduxjs/toolkit'
import bookService from '../services/books'

const initialState = []

  const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
      setBooks(state, action) {
        return action.payload
      },
      appendBook(state, action) {
        state.push(action.payload)
      },
      selectedBook(state, action) {
        return action.payload
      }
    },
  })

export const { setBooks, appendBook, selectedBook } = bookSlice.actions

export const initializeBooks = () => {
  return async dispatch => {
    const books = await bookService.getAll()
    dispatch(setBooks(books))
  }
}

export const selectBook = () => {
    return async dispatch => {
      const books = await bookService.getAll()
      console.log(books[0])
      dispatch(selectedBook(books[0]))
    }
  }

export default bookSlice.reducer

