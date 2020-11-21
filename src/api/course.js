import axios from "axios";
import { domain, coursePath } from "./utils";
import { getToken } from "./auth";

const createCourse = async (data, id = "") => {
  const token = getToken();
  try {
    const res = await axios.post(
      `${domain}/${coursePath}/${id}`,
      data
      // {
      // course: data
      // }, {
      //   headers: {
      //     "x-auth-token": token
      //   }
      // }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export { createCourse };
