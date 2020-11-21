import axios from "axios";
import {
  domain,
  coursePath
} from "./utils";
import {
  getToken
} from "./auth";

const createCourse = async (data, id = "") => {
  const token = getToken();
  try {
    const res = await axios.post(
      `${domain}/${coursePath}/${id}`,
      data
      // {
      // course: data
      , {
        headers: {
          "x-auth-token": token,
          "Content-Type": "multipart/form-data",
        }
      }
    );
    return res.data;
  } catch (error) {
    return {
      error: error.response.data.message
    };

  }
};

export {
  createCourse
};