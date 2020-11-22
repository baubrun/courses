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
//     console.log("user-api token :>> ", token);
//     try {
//         const res = await axios.get(
//             `${domain}/${usersPath}/${id}`,
//             null, {
//                 headers: {
//                     "Authorization": "Bearer " + token
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
        let req = await fetch(
            `${domain}/${usersPath}/${id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        const res = await req.text()
        return JSON.parse(res)
    } catch (error) {
        return {
            error: error.message
        };
    }
}



const signIn = async (user) => {
    try {
        const req = await fetch(`${domain}/${signInPath}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        const res = await req.text()
        return JSON.parse(res)
    } catch (error) {
        return {
            error: error.message
        };

    }
};

// const signIn = async (user) => {
//     try {
//         const res = await axios.post(`${domain}/${signInPath}`, user);
//         return res.data;
//     } catch (error) {
//         return {
//             error: error.response.data.message
//         };

//     }
// };


const signOut = async () => {
    try {
        const req = await fetch(`${domain}/${signOutPath}`);
        const res = await req.text()
        return JSON.parse(res)
    } catch (error) {
        return {
            error: error.message
        };
    }
};

// const signOut = async () => {
//     try {
//         const res = await axios.get(`${domain}/${signOutPath}`);
//         return res.data;
//     } catch (error) {
//         return {
//             error: error.response.data.message
//         };
//     }
// };




export default {
    read,
    signIn,
    signOut,
};