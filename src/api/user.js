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
            error: "Invalid email or password."
        };
    }
};


const signOut = async () => {
    try {
        const res = await axios.get(`${domain}/${signOutPath}`);
        return res.data;
    } catch (error) {
        return {
            error: "Internal Error."
        };
    }
};




export {
    signIn,
    signOut,
};