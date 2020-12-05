import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { domain } from "../Utils";


export const register = createAsyncThunk(
    "/register", 
async (data) => {
  try {
    const res = await axios.post(`${domain}/register`, data);
    return res.data;
  } catch (error) {
    return {
      error: error.response.data.error,
    };
  }
});


export const updateUser = async (data, id, path) => {
    const token = isAuthenticated();
    try {
      const res = await axios.patch(
        `${domain}/${path}/${id}`, {
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
    loadUser: (state, action) => {
      state.user = action.payload;
    },
    signInAction: (state, action) => {
      state.loggedIn = true;
      state.user = action.payload;
    },
    signOutAction: (state) => {
      state.loggedIn = false;
      state.user = {};
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      const { error, user } = action.payload;
      if (error) {
        state.error = error;
      } else {
        state.loggedIn = true;
        state.user = user;
        state.error = "";
      }
    },
    [register.rejected]: (state, action) => {
      state.error = action.payload.error;
    },

    [logIn.rejected]: (state, action) => {
      state.error = action.payload.error;
    },
    [logIn.fulfilled]: (state, action) => {
      const { error, user } = action.payload;
      if (error) {
        state.error = error;
      } else {
        state.loggedIn = true;
        state.user = user;
        state.error = "";
      }
    },
  },
});

export const { signInAction, signOutAction, loadUser } = userSlice.actions;
export const userState = (state) => state.user;
export default userSlice.reducer;
