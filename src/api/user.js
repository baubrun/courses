import axios from "axios";
import {
    domain,
    signInPath,
    signOutPath,
} from "./utils";



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
    signIn,
    signOut,
};