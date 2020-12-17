import axios from "axios";
import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";
import authAPI from "../api/auth";
import {
  domain
} from "../api/utils"




export const createUser = createAsyncThunk(
  "/api/users",
  async (data) => {
    try {
      const res = await axios.post(`${domain}/api/users`, data);
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
        error: error.response.data.error
      };
    }
  });


export const readUser = createAsyncThunk(
    "/readUser",
  async (userId) => {
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
       return {
         error: error.response.data.error
       };
     }
   })
 

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
  
  

export const updateUser = createAsyncThunk("/updateUser", 
async (data) => {
  const token = authAPI.isAuthenticated();
  try {
    const res = await axios.patch(
      `${domain}/api/users/${data._id}`, 
        {user: data}
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
    error: "",
    loading: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = ""
    },
    signOut: (state) => {
      state.loggedIn = false;
      state.user = {};
      state.error = ""
      authAPI.deleteToken();
    },
  },
  extraReducers: {

    [createUser.pending]: (state) => {
      state.loading = true
    },
    [createUser.fulfilled]: (state, action) => {
      state.loading = false
      const {
        error,
        user
      } = action.payload;
      if (error) {
        state.error = error;
      } else {
         state.user = user
         state.loggedIn = true
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
      state.loading = false;
      state.error = action.payload.error;
    },


    [readUser.pending]: (state) => {
      state.loading = true;
    },
    [readUser.fulfilled]: (state, action) => {
      state.loading = false;
      const { error, user } = action.payload;
      if (error) {
        state.error = error;
      } else {
        state.user = user;
      }
    },
    [readUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },


    [signIn.pending]: (state) => {
      state.loading = true;
    },
    [signIn.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        error,
        user,
        token
      } = action.payload;
      if (error) {
        state.error = error;
      } else {
        state.user = user;
        state.loggedIn = true
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

export const {
  signOut,
  clearError
} = userSlice.actions;
export const userState = (state) => state.user;
export default userSlice.reducer;