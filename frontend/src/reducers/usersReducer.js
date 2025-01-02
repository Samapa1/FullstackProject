import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";

const initialState = [];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
    deleteUser(state, action) {
      console.log(JSON.parse(JSON.stringify(state)));
      const id = action.payload;
      const filteredUsers = state.filter((user) => user.id !== id);
      return filteredUsers;
    },
    updateUsers(state, action) {
      const updatedUser = action.payload;
      const updatedUsers = state.map((user) =>
        user.id !== updatedUser ? user : updatedUser,
      );
      return updatedUsers;
    },
  },
});

export const { setUsers, deleteUser, updateUsers } = usersSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll();
    dispatch(setUsers(users));
  };
};

export const removeUser = (userObject) => {
  return async (dispatch) => {
    await usersService.adminRemove(userObject);
    dispatch(deleteUser(userObject.id));
  };
};

export const updateUser = (userObject) => {
  return async (dispatch) => {
    const updatedUser = await usersService.update(userObject);
    dispatch(updateUsers(updatedUser));
  };
};

export default usersSlice.reducer;
