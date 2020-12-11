import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";
import axios from "axios";
import {
  domain
} from "../api/utils"
import authAPI from "../api/auth";


export const createEnrollment = createAsyncThunk(
  "/createEnrollment",
  async (courseId) => {
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
      return {
        error: error.response.data.error
      };
    }
  })


export const completeEnrollment = createAsyncThunk(
  "/completeEnrollment",
  async (data) => {
    const token = authAPI.isAuthenticated();
    try {
      const res = await axios.post(
        `${domain}/api/enrollment/new/${data.enrollmentId}`,
        data.enrollment, {
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




export const readEnrollment = createAsyncThunk(
  "/readEnrollment",
  async (enrollmentId) => {
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
      return {
        error: error.response.data.error
      };
    }
  });



export const listEnrollments = createAsyncThunk(
  "/listEnrollments",
  async () => {
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
      return {
        error: error.response.data.error
      };
    }
  });


export const readEnrollmentStats = createAsyncThunk(
  "/readEnrollmentStats",
  async (courseId) => {
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
      return {
        error: error.response.data.error
      };
    }
  });





const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState: {
    enrollment: {},
    enrollments: [],
    error: "",
    loading: false,
    statsError: "",
    stats: {},
  },
  reducers: {
    clearEnrollmentError: (state) => {
      state.error = ""
    },
  },
  extraReducers: {


    [createEnrollment.pending]: (state) => {
      state.loading = true;
    },
    [createEnrollment.fulfilled]: (state, action) => {

      state.loading = false;
      const {
        error,
        enrollment
      } = action.payload;
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


    [readEnrollment.pending]: (state) => {
      state.loading = true;
    },
    [readEnrollment.fulfilled]: (state, action) => {

      state.loading = false;
      const {
        error,
        enrollment
      } = action.payload;
      if (error) {
        state.error = error;
      } else {
        state.enrollment = enrollment
      }
    },
    [readEnrollment.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },


    [readEnrollmentStats.pending]: (state) => {
      state.loading = true;
    },
    [readEnrollmentStats.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        error,
        stats
      } = action.payload;
      if (error) {
        state.statsError = error;
      } else {
        state.stats = stats
      }
    },
    [readEnrollmentStats.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },


    [listEnrollments.pending]: (state) => {
      state.loading = true;
    },
    [listEnrollments.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        error,
        enrollments
      } = action.payload;
      if (error) {
        state.error = error;
      } else {
        state.enrollments = enrollments
      }
    },
    [listEnrollments.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },


  }
});

export const {
  clearError,
  clearEnrollmentError,
} = enrollmentSlice.actions
export const enrollmentState = (state) => state.enrollment;
export default enrollmentSlice.reducer;