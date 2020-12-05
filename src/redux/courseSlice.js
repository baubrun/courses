import { createSlice } from "@reduxjs/toolkit";
import {domain} from "../../utils"
import axios from "axios";
import authAPI from "./auth";

const coursesByPath = "api/courses/by";


const createCourse = async (data) => {
  const token = isAuthenticated();
  try {
    const res = await axios.post(
        `${domain}/${coursesByPath}/${id}`, 
    data, {
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

const createNewLesson = async (data) => {
  const token = authAPI.isAuthenticated();
  try {
    const res = await axios.post(
        `/api/courses/${data.id}/lesson/new`, 
    data, {
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


const listCourseByInstructor = async (id) => {
  const token = authAPI.isAuthenticated();
  try {
    let res = await axios.get(`${domain}/${coursesByPath}/${id}`, {
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
};

const readCourse = async (id) => {
  const token = authAPI.isAuthenticated();
  try {
    let res = await axios.get(`${domain}/${coursesByPath}/${id}`, {
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
};


const courseSlice = createSlice({
  name: "course",
  initialState: {
    course: {},
    courses: [],
  },
  reducers: { },
  extraReducers: {

  }
});


export const courseState = (state) => state.course;
export default courseSlice.reducer;
