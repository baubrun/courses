import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "../api/auth";


const createUser = createAsyncThunk("/api/users", async (data) => {
  try {
    const res = await axios.post(`${domain}/api/users`, data);
    return res.data;
  } catch (error) {
    return {
      error: error.response.data.error,
    };
  }
});


const readUser = createAsyncThunk("/readUser", async (data) => {
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


const signIn = createAsyncThunk("/signin", async (data) => {
  try {
    const res = await axios.post(
        `${domain}api/auth/signin`)
    return res.data;
  } catch (error) {
    return {
      error: error.response.data.error
    };
  }
});

const deleteUser = createAsyncThunk("/deleteUser", async (data) => {
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
      error: error.response.data.error
    };
  }
});

const listUsers = createAsyncThunk("/listUsers", async () => {
  try {
    const res = await axios.get(`${domain}/users`);
    return res.data;
  } catch (error) {
    return {
      error: error.response.data.error
    };
  }
});


const updateUser = createAsyncThunk("/updateUser", async (data) => {
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
      if (error) {
        state.error = error;
      } else {
        state.user = user;
        authAPI.setToken(token)
      }
    },
    [signIn.rejected]: (state, action) => {
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

export const { signOut } = userSlice.actions;
export const userState = (state) => state.user;
export default userSlice.reducer;
