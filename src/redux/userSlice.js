import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { domain } from "../Utils";
import api from "../api/auth"


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

export const readUser = createAsyncThunk("/register", async (data) => {
    try {
      const res = await axios.post(`${domain}/api/users`, data)
      return res.data;
    } catch (error) {
      return {
        error: error.response.data.error
      };
    }
  });
  

export const updateUser = async (data, id, path) => {
    const token = isAuthenticated();
    try {
      const res = await axios.patch(
        `${domain}/api/users/${id}`, {
          user: data,
        }, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      return {
        error: error.response.data.error
      };
    }
  };
  

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
      api.deleteToken()
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


    [readUser.rejected]: (state, action) => {
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
        api.setToken(token)
      }
    },
  },
});


export const { signOut } = userSlice.actions;
export const userState = (state) => state.user;
export default userSlice.reducer;
