import { createSlice } from '@reduxjs/toolkit'

const initialState = []

  const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
      setUser(state, action) {
        return action.payload
      }
    },
      updateUser(state, action) {
        return action.payload
      }
  })

export const { setUser, updateUser } = userSlice.actions

// export const initializeUser = () => {
//   return async dispatch => {
//     const user = 
//     dispatch(setUser(user))
//   }
// }


export default userSlice.reducer