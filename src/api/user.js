import axios from "axios";

import {domain} from "../api/utils"
import authAPI from "../api/auth";


 const readUser = async (userId) => {
   const token = authAPI.isAuthenticated()
    try {
      const res = await axios.get(
        `${domain}/api/users/${userId}`, {
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
  }
  




  export default {
      readUser,
  }