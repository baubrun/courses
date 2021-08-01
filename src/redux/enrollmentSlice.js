import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";
import axios from "axios";
import {
  domain
} from "../api/utils"
import authAPI from "../api/auth";
import { showLoader, hideLoader } from "./layoutSlice"

export const createEnrollment = createAsyncThunk(
  "/createEnrollment",
  async (courseId, thunkAPI) => {
    thunkAPI.dispatch(showLoader())
    const token = authAPI.isAuthenticated();
    try {
      const res = await axios.post(
        `${domain}/api/enrollment/new/${courseId}`,
         null,{
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
  })


export const completeEnrollment = createAsyncThunk(
  "/completeEnrollment",
  async (data, thunkAPI) => {
    thunkAPI.dispatch(showLoader())
    const token = authAPI.isAuthenticated();
    try {
      const res = await axios.put(
        `${domain}/api/enrollment/complete/${data.enrollmentId}`,
        data.enrollment, {
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
  })



export const readEnrollment = createAsyncThunk(
  "/readEnrollment",
  async (enrollmentId, thunkAPI) => {
    const token = authAPI.isAuthenticated();
    try {
      const res = await axios.get(
        `${domain}/api/enrollment/${enrollmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      thunkAPI.dispatch(hideLoader())
      return thunkAPI.rejectWithValue(error.response.data);
    } 
});



export const listEnrollments = createAsyncThunk(
  "/listEnrollments",
  async (_, thunkAPI) => {
    const token = authAPI.isAuthenticated();
    try {
      const res = await axios.get(
        `${domain}/api/enrollment/enrolled`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(hideLoader())
      return thunkAPI.rejectWithValue(error.response.data);
    }
  });


export const readEnrollmentStats = createAsyncThunk(
  "/readEnrollmentStats",
  async (courseId, thunkAPI) => {
    const token = authAPI.isAuthenticated();
    try {
      const res = await axios.get(
        `${domain}/api/enrollment/stats/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(hideLoader())
      return thunkAPI.rejectWithValue(error.response.data);
    } 
  });



const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState: {
    enrollment: {},
    enrollments: [],
    loading: false,
    stats: {},
    error: null,
  },
  reducers: {
    clearEnrollment: (state) => {
      state.enrollments = []
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: {

    [createEnrollment.fulfilled]: (state, action) => {
      const {
        enrollment
      } = action.payload;
        state.enrollments = [...state.enrollments, enrollment]
      
    },
    [createEnrollment.rejected]: (state, action) => {
      state.error = action.payload?.error;
    },

  
    [completeEnrollment.fulfilled]: (state, action) => {
      const {
        enrollment
      } = action.payload;
        state.enrollment = enrollment
    },
    [completeEnrollment.rejected]: (state, action) => {
      state.error = action.payload?.error;
    },


    [readEnrollment.fulfilled]: (state, action) => {
      const {
        enrollment
      } = action.payload;
        state.enrollment = enrollment
    },
    [readEnrollment.rejected]: (state, action) => {
      state.error = action.payload?.error;
    },


    [readEnrollmentStats.fulfilled]: (state, action) => {
      const {
        stats
      } = action.payload;
        state.stats = stats
    },
    [readEnrollmentStats.rejected]: (state, action) => {
      state.error = action.payload?.error;
    },


    [listEnrollments.fulfilled]: (state, action) => {
      const {
        enrollments
      } = action.payload;
        state.enrollments = enrollments
    },
    [listEnrollments.rejected]: (state, action) => {
      state.error = action.payload?.error;
    },


  }
});

export const {
  clearError,
  clearEnrollment
} = enrollmentSlice.actions
export const enrollmentState = (state) => state.enrollment;
export default enrollmentSlice.reducer;