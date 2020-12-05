import axios from "axios";

import {
    isAuthenticated
} from "./auth"


 const createUser = createAsyncThunk(
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


const deleteUser = createAsyncThunk(
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
          error: error.response.data.error
        };
      }
    });

    
 const listUsers = createAsyncThunk(
    "/listUsers", 
async () => {
  try {
    const res = await axios.get(`${domain}/users`);
    return res.data;
  } catch (error) {
    return {
      error: error.response.data.error
    };
  }
});


 const deleteUser = createAsyncThunk(
    "/cre", 
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


 const updateUser = createAsyncThunk(
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
      error: error.response.data.error
    };
  }
});




 export default {
    createUser,
    deleteUser,
    listUsers,
    readUser,
    updateUser,
    
};