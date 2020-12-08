import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {domain} from "../api/utils"
import axios from "axios";
import authAPI from "../api/auth";


export const createCourse = createAsyncThunk(
  "/createCourse",
async (data) => {
  const token = authAPI.isAuthenticated();
  try {
      const res = await axios.post(
          `${domain}/api/courses/by/${data._id}`,
          data.course, {
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
})


export const listCourseByInstructor = createAsyncThunk(
  "/listCourseByInstructor",
async (userId) => {
  const token = authAPI.isAuthenticated();
  try {
    let res = await axios.get(
      `${domain}/api/courses/by/${userId}`,
     {
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


export const readCourse = createAsyncThunk(
"/readCourse",
async (courseId) => {
  const token = authAPI.isAuthenticated();
  try {
    let res = await axios.get(`${domain}/api/courses/${courseId}`, {
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


const courseSlice = createSlice({
  name: "course",
  initialState: {
    course: {},
    courses: [],
    loading: false,
    error: "",
  },
  reducers: { 
    clearError: (state, action) => {
      state.error = ""
    },
    setError: (state, action) => {
      state.error = action.payload.error
    }
  },
  extraReducers: {


    [createCourse.pending]: (state) => {
      state.loading = true;
    },
    [createCourse.fulfilled]: (state, action) => {
        state.loading = false;
      const { error, courses } = action.payload;
      if (error) {
        state.error = error;
      } else {
        state.courses = courses;
      }
    },
    [createCourse.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },



    [listCourseByInstructor.pending]: (state) => {
      state.loading = true;
    },
    [listCourseByInstructor.fulfilled]: (state, action) => {
        state.loading = false;
      const { error, courses } = action.payload;
      if (error) {
        state.error = error;
      } else {
        state.courses = courses;
      }
    },
    [listCourseByInstructor.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },


    [readCourse.pending]: (state) => {
      state.loading = true;
    },
    [readCourse.fulfilled]: (state, action) => {
        state.loading = false;
      const { error, course } = action.payload;
      if (error) {
        state.error = error;
      } else {
        state.course = course;
      }
    },
    [readCourse.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  }
});

export const {clearError, setError} = courseSlice.actions
export const courseState = (state) => state.course;
export default courseSlice.reducer;
