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
    const req = await fetch(`${domain}/${coursesByPath}${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,
      },
      body: data,
    })
    const res = await req.text()
    return JSON.parse(res)
  } catch (error) {
    return {
      error: error.message
    };

  }
};


// const createCourse = async (data, id = "") => {
//   const token = getToken();
//   try {
//     const res = await axios.post(`${domain}/${coursesByPath}/${id}`,
//       data, {
//         headers: {
//           "Authorization": `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });
//     return res.data;
//   } catch (error) {
//     return {
//       error: error.response.data.message,
//     };
//   }
// };



const listCourseByInstructor = async (id = "") => {
  const token = getToken();
  try {
    const res = await axios.get(`${domain}/${coursesByPath}/${id}`, {
      instructor: id
    }, {
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



const read = async (id = "") => {
  const token = getToken();
  try {
    const res = await axios.get(`${domain}/${coursesPath}/${id}`,
      null, {
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


export default {
  createCourse,
  listCourseByInstructor,
  read,
};