import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {domain} from "../api/utils"
import axios from "axios";
import authAPI from "../api/auth";


export const createEnrollment = createAsyncThunk(
  "/createEnrollment",
async (data) => {
  const token = authAPI.isAuthenticated();
  try {
      const res = await axios.post(
          `${domain}/api/enrollment/new/${data._id}`,
          data.course, {
              headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
              },
          });
      return res.data;
  } catch (error) {
      return {
          error: error.response.data.error
      };
  }
})





const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState: {
    enrollment: {},
    loading: false,
    error: "",
  },
  reducers: { 
    clearError: (state) => {
      state.error = ""
    },
  },
  extraReducers: {


    [createEnrollment.pending]: (state) => {
      state.loading = true;
    },
    [createEnrollment.fulfilled]: (state, action) => {
        state.loading = false;
      const { error, enrollment } = action.payload;
      if (error) {
        state.error = error;
      } else {
        state.enrollment = enrollment
      }
    },
    [createEnrollment.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },


  }
});

export const {clearError} = enrollmentSlice.actions
export const enrollmentState = (state) => state.enrollment;
export default enrollmentSlice.reducer;
