import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";
import {
  domain
} from "../api/utils"
import axios from "axios";
import authAPI from "../api/auth";


export const createCourse = createAsyncThunk(
  "/createCourse",
  async (data, thunkAPI) => {
    const token = authAPI.isAuthenticated();
    try {
      const res = await axios.post(
        `${domain}/api/courses/by/${data.userId}`,
        data.course, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    } 
  })



export const listCourseByInstructor = createAsyncThunk(
  "/listCourseByInstructor",
  async (userId, thunkAPI) => {
    const token = authAPI.isAuthenticated();
    try {
      let res = await axios.get(
        `${domain}/api/courses/by/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    } 
  })

export const listCoursesPublished = createAsyncThunk(
  "/listCoursesPublished",
  async (_, thunkAPI) => {
    try {
      let res = await axios.get(
        `${domain}/api/courses/published`)
      return res.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    } 
  })


export const readCourse = createAsyncThunk(
  "/readCourse",
  async (courseId, thunkAPI) => {
    const token = authAPI.isAuthenticated();
    try {
      let res = await axios.get(
        `${domain}/api/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    } 
    
  })



export const updateCourse = createAsyncThunk(
  "/updateCourse",
  async (data, thunkAPI) => {
    const token = authAPI.isAuthenticated();
    try {
      const res = await axios.patch(
        `${domain}/api/courses/${data.courseId}`,
        data.course, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    } 
  })




const courseSlice = createSlice({
  name: "course",
  initialState: {
    course: {},
    courses: [],
    error: null,
  },
  reducers: {
    clearError: (state, action) => {
      state.error = null
    },
    setError: (state, action) => {
      state.error = action.payload.error
    },
  },
  extraReducers: {


  
    [createCourse.fulfilled]: (state, action) => {
      state.courses = [...state.courses, action.payload?.course]
    },
    [createCourse.rejected]: (state, action) => {
      state.error = action.payload?.error;
    },


    [listCourseByInstructor.fulfilled]: (state, action) => {
        state.courses = action.payload?.courses;
      },
    [listCourseByInstructor.rejected]: (state, action) => {
      state.error = action.payload?.error;
    },


    [listCoursesPublished.fulfilled]: (state, action) => {
        state.courses = action.payload?.courses;
      },
    [listCoursesPublished.rejected]: (state, action) => {
      state.error = action.payload?.error;
    },


    [readCourse.fulfilled]: (state, action) => {
        state.course = action.payload?.course;
    },
    [readCourse.rejected]: (state, action) => {
      state.error = action.payload?.error;
    },

    [updateCourse.fulfilled]: (state, action) => {
        state.course = action.payload?.course
    },
    [updateCourse.rejected]: (state, action) => {
      state.error = action.payload?.error;
    },

  }
});

export const {
  clearError,
  setError
} = courseSlice.actions
export const courseState = (state) => state.course;
export default courseSlice.reducer;