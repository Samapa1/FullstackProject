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
    console.log("bookReducer")
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

export const addBook = (bookObject) => {
  return async dispatch => {
    const newBook = await bookService.create(bookObject)
    dispatch(appendBook(newBook))
  }
}

export default bookSlice.reducer

