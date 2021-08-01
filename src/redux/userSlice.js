import axios from "axios";
import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";
import authAPI from "../api/auth";
import {
  domain
} from "../api/utils"
import { showToaster, showLoader, hideLoader } from "../redux/layoutSlice"



export const createUser = createAsyncThunk(
  "/api/users",
  async (data, thunkAPI) => {
    try {
      thunkAPI.dispatch(showLoader())
      const res = await axios.post(`${domain}/api/users`, data);
      return res.data;
    } catch (error) {
      return {
        error: error.response.data.error
      };
      // thunkAPI.rejectWithValue(error.response.data)
    } finally{
      thunkAPI.dispatch(hideLoader())
    }
  });




export const deleteUser = createAsyncThunk(
  "/deleteUser",
  async (data) => {
    const token = authAPI.isAuthenticated();
    try {
      const res = await axios.delete(`${domain}/${data.id}`, {
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

export const listUsers = createAsyncThunk(
  "/listUsers",
  async () => {
    try {
      const res = await axios.get(`${domain}/api/users`);
      return res.data;
    } catch (error) {
      return {
        error: error.response.data
      };
    }
  });


export const readUser = createAsyncThunk(
  "/readUser",
  async (userId, thunkAPI) => {
    thunkAPI.dispatch(showLoader())
    console.log('thunkAPI :>> ', thunkAPI);
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
      thunkAPI.dispatch(showToaster(error.response.data, "error"))
      // return {
      //   error: error.response.data.error
      // };
    } finally {
      thunkAPI.dispatch(hideLoader())
    }
  })


export const signIn = createAsyncThunk(
  "/signIn",
  async (data) => {
      const res = await axios.post(
        `${domain}/auth/signIn`, data)
      return res.data
  });



export const updateUser = createAsyncThunk("/updateUser",
  async (data) => {
    const token = authAPI.isAuthenticated();
    try {
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
    error: null,
    isLoading: false,
  },
  reducers: {
    signOut: (state) => {
      state.loggedIn = false;
      state.user = {};
      authAPI.deleteToken();
    },
  },
  extraReducers: {

    [createUser.pending]: (state) => {
      state.isLoading = true
    },
    [createUser.fulfilled]: (state, action) => {
      state.isLoading = false
      const {
        error,
        user,
        token
      } = action.payload;
      if (error) {
        state.error = error;
      } else {
        state.user = user
        state.loggedIn = true
        authAPI.setToken(token)
      }
    },
    [createUser.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload?.error;
    },


    [deleteUser.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      const { error, users } = action.payload;
      if (error) {
        state.error = error;
      } else {
        state.users = users
      }
    },
    [deleteUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.error;
    },


    [listUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [listUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      const {
        error,
        users
      } = action.payload;
      if (error) {
        state.error = error;
      } else {
        state.users = users;
      }
    },
    [listUsers.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.error;
    },


    [readUser.pending]: (state) => {
      state.isLoading = true;
    },
    [readUser.fulfilled]: (state, action) => (
      state.loading = false,
      state.user = action.payload?.user
      
    ),
    [readUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.error;
    },


    [signIn.pending]: (state, action) => {
      state.isLoading = true;
    },
    [signIn.fulfilled]: (state, action) => {
      state.isLoading = false;
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
      state.isLoading = false;
      state.error = action.payload?.error
     
    },


    [updateUser.pending]: (state) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      const { error, user } = action.payload;
      if (error) {
        state.error = error;
      } else {
        state.user = user;
      }
    },
    [updateUser.rejected]: (state, action) => {
      state.isLoading = false;
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