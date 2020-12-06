import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {domain} from "../api/utils"
import axios from "axios";
import authAPI from "../api/auth";

const coursesByPath = "api/courses/by";


export const createCourse = async (data) => {
  const token = authAPI.isAuthenticated();
  try {
    const res = await axios.post(
        `${domain}/${coursesByPath}/${data.id}`, 
    data.data, 
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
};


export const createNewLesson = async (data) => {
  const token = authAPI.isAuthenticated();
  try {
    const res = await axios.post(
        `/api/courses/${data.id}/lesson/new`, 
    data.lesson, {
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
};


export const listCourseByInstructor = createAsyncThunk(
  "/listCourseByInstructor",
async (id) => {
  const token = authAPI.isAuthenticated();
  try {
    let res = await axios.get(
      `${domain}/api/courses/by/${id}`,
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
  reducers: { },
  extraReducers: {

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
  }
});


export const courseState = (state) => state.course;
export default courseSlice.reducer;
