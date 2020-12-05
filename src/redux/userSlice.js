import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { domain } from "../Utils";
import api from "../api/auth";


export const createUser = createAsyncThunk(
    "/api/users", 
async (data) => {
  try {
    const res = await axios.post(`${domain}/api/users`, data);
    return res.data;
  } catch (error) {
    return {
      error: error.response.data.error,
    };
  }
});


export const listUsers = createAsyncThunk(
    "/api/users", 
async () => {
  try {
    const res = await axios.get(`${domain}/users`);
    return res.data;
  } catch (error) {
    return {
      error: error.response.data.error,
    };
  }
});


export const readUser = createAsyncThunk(
    "/register", 
    async (data) => {
  try {
    const res = await axios.post(`${domain}/api/users`, data);
    return res.data;
  } catch (error) {
    return {
      error: error.response.data.error,
    };
  }
});


export const updateUser = createAsyncThunk(
    "/updateUser", 
async (data) => {
  const token = isAuthenticated();
  try {
    const res = await axios.patch(
      `${domain}/api/users/${data.id}`,
      {
        user: data.data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    return {
      error: error.response.data.error,
    };
  }
});


const removeUser = createAsyncThunk(
"/deleteUser", 
async (data) => {
  const token = isAuthenticated();
  try {
    const res = await axios.delete(`${domain}/${data.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return {
      error: error.response.data.error,
    };
  }
});

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
      api.deleteToken();
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

    [readUser.fulfilled]: (state, action) => {
      const { error, user, token } = action.payload;
      if (error) {
        state.error = error;
      } else {
        state.loggedIn = true;
        state.user = user;
        state.error = "";
        api.setToken(token);
      }
    },
    [readUser.rejected]: (state, action) => {
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
        api.setToken(token);
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
