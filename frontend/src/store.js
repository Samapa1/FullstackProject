import { configureStore } from '@reduxjs/toolkit'

import bookReducer from './reducers/bookReducer'
import loanReducer from './reducers/loanReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    books: bookReducer,
    loans: loanReducer,
    user: userReducer 
  }
})

export default store