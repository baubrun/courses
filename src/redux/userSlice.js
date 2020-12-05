import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { domain } from "../Utils";
import authAPI from "../api/auth";
import userAPI from "../api/user"



export const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedIn: false,
    user: {},
    error: "",
  },
  reducers: {
    signOut: (state) => {
      state.loggedIn = false;
      state.user = {};
      authAPI.deleteToken();
    },
  },
  extraReducers: {
    [createUser.fulfilled]: (state, action) => {
      const { error, user } = action.payload;
      if (error) {
        state.error = error;
      } else {
        state.loggedIn = true;
        state.user = user;
        state.error = "";
      }
    },
    [createUser.rejected]: (state, action) => {
      state.error = action.payload.error;
    },

    [deleteUser.fulfilled]: (state, action) => {
      const { error, user, token } = action.payload;
      if (error) {
        state.error = error;
      } else {
        state.loggedIn = true;
        state.user = user;
        state.error = "";
        authAPI.setToken(token);
      }
    },
    [deleteUser.rejected]: (state, action) => {
      state.error = action.payload.error;
    },

    [removeUser.fulfilled]: (state, action) => {
      const { error, user, token } = action.payload;
      if (error) {
        state.error = error;
      } else {
        state.loggedIn = true;
        state.user = user;
        state.error = "";
        authAPI.setToken(token);
      }
    },
    [removeUser.rejected]: (state, action) => {
      state.error = action.payload.error;
    },
  },
});

export const { signOut } = userSlice.actions;
export const userState = (state) => state.user;
export default userSlice.reducer;
