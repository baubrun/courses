import axios from "axios";
import {
    domain,
    signInPath,
    signOutPath,
    usersPath
} from "./utils";
import {getToken} from "./auth"


const read = async (id) => {
    const token = getToken();
    console.log('token :>> ', token);
    try {
      const res = await axios.get(
        `${domain}/${usersPath}/${id}`,
        null, {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      return res.data;
    } catch (error) {
      return {
        error: error.response.data.message
      };
    }
  };
  

const signIn = async (user) => {
    try {
        const res = await axios.post(`${domain}/${signInPath}`, user);
        return res.data;
    } catch (error) {
        return {
            error: error.response.data.message
        };

    }
};


const signOut = async () => {
    try {
        const res = await axios.get(`${domain}/${signOutPath}`);
        return res.data;
    } catch (error) {
        return {
            error: error.response.data.message
        };
    }
};




export default{
    read,
    signIn,
    signOut,
};