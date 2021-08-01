import axios from "axios";
import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";
import authAPI from "../api/auth";
import {
  domain
} from "../api/utils"
import { showLoader, hideLoader } from "./layoutSlice"



export const createUser = createAsyncThunk(
  "/api/users",
  async (data, thunkAPI) => {
    try {
      thunkAPI.dispatch(showLoader())
      const res = await axios.post(`${domain}/api/users`, data);
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(hideLoader())
      return thunkAPI.rejectWithValue(error.response.data);
    } finally {
      thunkAPI.dispatch(hideLoader())
    }
  });



export const deleteUser = createAsyncThunk(
  "/deleteUser",
  async (data, thunkAPI) => {
    thunkAPI.dispatch(showLoader())
    const token = authAPI.isAuthenticated();
    try {
      const res = await axios.delete(`${domain}/${data.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(hideLoader())
      return thunkAPI.rejectWithValue(error.response.data);
    } finally {
      thunkAPI.dispatch(hideLoader())
    }
  });


export const listUsers = createAsyncThunk(
  "/listUsers",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${domain}/api/users`);
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(hideLoader())
      return thunkAPI.rejectWithValue(error.response.data);
    } 
  });


export const readUser = createAsyncThunk(
  "/readUser",
  async (userId, thunkAPI) => {
    const token = authAPI.isAuthenticated()
    try {
      const res = await axios.get(
        `${domain}/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data
    } catch (error) {
      thunkAPI.dispatch(hideLoader())
      return thunkAPI.rejectWithValue(error.response.data);
    } 
  })


  export const signIn = createAsyncThunk(
    "/signIn",
    async (data, thunkAPI) => {
      thunkAPI.dispatch(showLoader())
      try {
        const res = await axios.post(
          `${domain}/auth/signIn`, data)
        return res.data;
      } catch (error) {
        thunkAPI.dispatch(hideLoader())
        return thunkAPI.rejectWithValue(error.response.data);
      } 
      finally {
        thunkAPI.dispatch(hideLoader())
      }
    });
  


export const updateUser = createAsyncThunk("/updateUser",
  async (data, thunkAPI) => {
    const token = authAPI.isAuthenticated();
    try {
      thunkAPI.dispatch(showLoader())
      const res = await axios.patch(
        `${domain}/api/users/${data._id}`,
        { user: data }
        , {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(hideLoader())
      return thunkAPI.rejectWithValue(error.response.data);
    } finally {
      thunkAPI.dispatch(hideLoader())
    }
  });

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedIn: false,
    user: {},
    users: [],
    error: null,
  },
  reducers: {
    signOut: (state) => {
      state.loggedIn = false;
      state.user = {};
      authAPI.deleteToken();
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: {

   
    [createUser.fulfilled]: (state, action) => {
      state.isLoading = false
      const {
        user,
        token
      } = action.payload;
      state.user = user
      state.loggedIn = true
      authAPI.setToken(token)
    },
    [createUser.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload?.error;
    },


    [deleteUser.fulfilled]: (state, action) => {
      state.users = action.payload?.users
    },
    [deleteUser.rejected]: (state, action) => {
      state.error = action.payload?.error;
    },


    [listUsers.fulfilled]: (state, action) => {
      const {
        users
      } = action.payload;
      state.users = users;
    },
    [listUsers.rejected]: (state, action) => {
      state.error = action.payload?.error;
    },



    [readUser.fulfilled]: (state, action) => (
      state.user = action.payload?.user
    ),
    [readUser.rejected]: (state, action) => {
      state.error = action.payload?.error;
    },


  
    [signIn.fulfilled]: (state, action) => {
      const {
        user,
        token
      } = action.payload;
      {
        state.user = user;
        state.loggedIn = true
        authAPI.setToken(token)
      }
    },
    [signIn.rejected]: (state, action) => {
      state.error = action.payload?.error
    },


    [updateUser.fulfilled]: (state, action) => {
      state.user = action.payload?.user;
    },
    [updateUser.rejected]: (state, action) => {
      state.error = action.payload?.error;
    },


  },
});

export const {
  signOut,
  clearError
} = userSlice.actions;
export const userState = (state) => state.user;
export default userSlice.reducer;