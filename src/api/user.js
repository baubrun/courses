import axios from "axios";

import {domain} from "../api/utils"


 const readUser = async (userId) => {
    try {
      const res = await axios.get(
          `${domain}/api/users/${userId}`);
      return res.data;
    } catch (error) {
      return {
        error: error.response.data.error
      };
    }
  }
  




  export default {
      readUser,
  }