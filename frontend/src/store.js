import { configureStore } from '@reduxjs/toolkit'

import bookReducer from './reducers/bookReducer'
// import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    books: bookReducer
    // users: userReducer
  }
})

export default store