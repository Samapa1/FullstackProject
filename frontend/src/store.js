import { combineReducers, configureStore } from '@reduxjs/toolkit'

import bookReducer from './reducers/bookReducer'
import loanReducer from './reducers/loanReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
import reservationReducer from './reducers/reservationReducer'
import notificationReducer from './reducers/notificationReducer'

const rootReducer = combineReducers({
  notification: notificationReducer, 
  books: bookReducer,
  loans: loanReducer,
  reservations: reservationReducer,
  user: userReducer,
  users: usersReducer
})

export const setUpStore = preloadedState => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}
