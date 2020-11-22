import axios from "axios";
import {
  domain,
  coursesByPath,
  coursesPath,
} from "./utils";
import {
  getToken
} from "./auth";


const createCourse = async (data, id = "") => {
  const token = getToken();
  try {
    const res = await axios.post(`${domain}/${coursesByPath}/${id}`,
      data, {
        headers: {
          "x-auth-token": token,
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



const listCourseByInstructor = async (id = "") => {
  const token = getToken();
  try {
    const res = await axios.get(`${domain}/${coursesByPath}/${id}`, {
      instructor: id
    }, {
      headers: {
        "x-auth-token": token,
      },
    });
    return res.data;
  } catch (error) {
    return {
      error: error.response.data.message,
    };
  }

};


// const listCourseByInstructor = async (id) => {
//   const token = getToken();
//   try {
//     const res = await axios.get(`${domain}/${coursesByPath}/${id}`, 
//     null,
//     {
//       headers: {
//         "Authorization": token,
//       },
//     });
//     return res.data;
//   } catch (error) {
//     return {
//       error: error.response.data.message,
//     };
//   }

// }


const read = async (id = "") => {
  const token = getToken();
  try {
    const res = await axios.get(`${domain}/${coursesPath}/${id}`,
     null, {
      headers: {
        "x-auth-token": token,
      },
    });
    return res.data;
  } catch (error) {
    return {
      error: error.response.data.message,
    };
  }

};


export default {
  createCourse,
  listCourseByInstructor,
  read,
};