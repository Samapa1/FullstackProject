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
      },
      updateBooks(state, action) {
        const updatedBook = action.payload
        return state.map(book => 
          book.id !== updatedBook.id ? book : updatedBook
        )
      },
      deleteBook(state, action) {
        const id = action.payload
        return state.filter(book => book.id !== id)
      }
    },
  })

export const { setBooks, appendBook, selectedBook, updateBooks, deleteBook } = bookSlice.actions

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

export const addBook = (bookObject) => {
  return async dispatch => {
    const newBook = await bookService.create(bookObject)
    dispatch(appendBook(newBook))
  }
}

export const updateBook = (bookObject) => {
  return async dispatch => {
    const updatedBook = await bookService.update(bookObject)
    dispatch(updateBooks(updatedBook))
  }
}

export const rateBook = (bookObject) => {
  return async dispatch => {
    const updatedBook = await bookService.update(bookObject)
    dispatch(updateBooks(updatedBook))
  }
}

export const removeBook = (id) => {
  return async dispatch => {
    console.log("removebookReducer")
    await bookService.remove(id)
    dispatch(deleteBook(id))
  }
}


export default bookSlice.reducer

