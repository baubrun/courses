import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "../api/auth";
import {domain} from "../api/utils"

export const createUser = createAsyncThunk("/api/users", async (data) => {
  try {
    const res = await axios.post(`${domain}/api/users`, data);
    return res.data;
  } catch (error) {
    return {
      error: error.response.data.error,
    };
  }
});


export const readUser = createAsyncThunk("/readUser", async (data) => {
  try {
    const res = await axios.post(
        `${domain}/api/users/${data.userId}`, data);
    return res.data;
  } catch (error) {
    return {
      error: error.response.data.error
    };
  }
});


export const signIn = createAsyncThunk(
  "/signIn", 
async (data) => {
  try {
    const res = await axios.post(
        `${domain}/auth/signIn`, data)
    return res.data;
  } catch (error) {
    return {
      error: error.response.data.error
    };
  }
});

export const deleteUser = createAsyncThunk(
  "/deleteUser", 
async (data) => {
  const token = authAPI.isAuthenticated();
  try {
    const res = await axios.delete(`${domain}/${data.id}`,
     {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return {
      error: error.response.data.error
    };
  }
});

export const listUsers = createAsyncThunk("/listUsers", async () => {
  try {
    const res = await axios.get(`${domain}/users`);
    return res.data;
  } catch (error) {
    return {
      error: error.response.data.error
    };
  }
});


export const updateUser = createAsyncThunk("/updateUser", async (data) => {
  const token = authAPI.isAuthenticated();
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
      error: error.response.data.error
    };
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedIn: false,
    user: {},
    users: [],
    error: "",
    loading: false,
  },
  reducers: {
    clearError: (state) =>{
      state.error = ""
    },
    signOut: (state) => {
      state.loggedIn = false;
      state.user = {};
      authAPI.deleteToken();
    },
  },
  extraReducers: {

    [createUser.pending]: (state, action) => {
        state.loading = true
        state.error = action.payload.error;
      },
    [createUser.fulfilled]: (state, action) => {
        state.loading = false
      const { error, user } = action.payload;
      if (error) {
        state.error = error;
      } else {
        state.loggedIn = true;
        state.user = user;
      }
    },
    [createUser.rejected]: (state, action) => {
        state.loading = false
      state.error = action.payload.error;
    },


    [deleteUser.pending]: (state) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      const { error, users } = action.payload;
      if (error) {
        state.error = error;
      } else {
        state.users = users
      }
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },


    [listUsers.pending]: (state) => {
      state.loading = true;
    },
    [listUsers.fulfilled]: (state, action) => {
        state.loading = false;
      const { error, users } = action.payload;
      if (error) {
        state.error = error;
      } else {
        state.users = users;
      }
    },
    [listUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },



    [signIn.pending]: (state) => {
      state.loading = true;
    },
    [signIn.fulfilled]: (state, action) => {
      state.loading = false;
      const { error, user, token } = action.payload;
      console.log('action.payload :>> ', action.payload);
      if (error) {
        state.error = error;
      } else {
        state.user = user;
        state.loggedIn = true
        authAPI.setToken(token)
      }
    },
    [signIn.rejected]: (state, action) => {
      console.log('action.payload :>>', action)
      state.loading = false;
      state.error = action.payload.error;
    },


    [updateUser.pending]: (state) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      const { error, user } = action.payload;
      if (error) {
        state.error = error;
      } else {
        state.user = user;
      }
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const { signOut, clearError } = userSlice.actions;
export const userState = (state) => state.user;
export default userSlice.reducer;
