import axios from "axios";
import {
  domain,
  coursesByPath,
  coursesPath,
} from "./utils";
import {
  isAuthenticated
} from "./auth";



const createCourse = async (data, id = "") => {
  const token = isAuthenticated();
  try {
    const res = await axios.post(`${domain}/${coursesByPath}/${id}`,
      data, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
    return res.data;
  } catch (error) {
    return {
      error: error.response.data.message,
    };
  }
};


const createNewLesson = async (data, id = "") => {
  const token = isAuthenticated();
  try {
    const res = await axios.post(`/api/courses/${id}/lesson/new`,
      data, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
    return res.data;
  } catch (error) {
    return {
      error: error.response.data.message,
    };
  }
};



const listCourseByInstructor = async (id = "") => {
  const token = isAuthenticated();
  try {
    let req = await fetch(
      `${domain}/${coursesByPath}/${id}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
    const res = await req.text()
    return JSON.parse(res)
  } catch (error) {
    return {
      error: error.message
    };
  }
};



const read = async (id) => {
  const token = isAuthenticated();
  try {
    let req = await fetch(
      `${domain}/${coursesByPath}/${id}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
    const res = await req.text()
    return JSON.parse(res)
  } catch (error) {
    return {
      error: error.message
    };
  }
}



export default {
  createCourse,
  createNewLesson,
  listCourseByInstructor,
  read,
};