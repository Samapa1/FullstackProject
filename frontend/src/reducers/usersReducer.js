import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const initialState = []

  const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
      setUsers(state, action) {
        return action.payload
      },
      deleteUser(state, action) {
        console.log(JSON.parse(JSON.stringify(state)))
        const id = action.payload;
        const updatedUsers = state.filter (user => user.id !== id)
        return updatedUsers
      }
    },
  })

export const { setUsers, deleteUser } = usersSlice.actions

export const initializeUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch(setUsers(users))
  }
}

export const removeUser = (id) => {
  return async dispatch => {
    await usersService.remove(id)
    dispatch(deleteUser(id))
  }
}

export default usersSlice.reducer
