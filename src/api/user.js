import axios from "axios";
import {
    domain,
    signInPath,
    signOutPath,
    usersPath
} from "./utils";
import {
    getToken
} from "./auth"


// const read = async (id) => {
//     const token = getToken();
//     console.log('user-api token :>> ', token);
//     try {
//         const res = await axios.get(
//             `${domain}/${usersPath}/${id}`,
//             null, {
//                 headers: {
//                     'Authorization': 'Bearer ' + token
//                 },
//             }
//         );
//         return res.data;
//     } catch (error) {
//         return {
//             error: error.response.data.message
//         };
//     }
// };

const read = async (id) => {
    const token = getToken();
    try {
        let response = await fetch('/api/users/' + id, {
            method: 'GET',
            headers: {
                //   'Accept': 'application/json',
                //   'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        const body = await response.text()
        return JSON.parse(body)
    } catch (error) {
        return {
            error: error.message
        };
    }
}



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




export default {
    read,
    signIn,
    signOut,
};