import axios from "axios";
import {
  domain
} from "./utils";
import {
  getToken
} from "./auth";


const create = async (data, path, id = "") => {
  let req;
  const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
  try {
    if (!id) {
      req = await fetch(`${domain}/${path}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers,
      });
    } else {
      req = await fetch(`${domain}/${path}/${id}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers,
      })
      const res = await req.text()
      return JSON.parse(res)
    }
  } catch (error) {
    return {
      error: error.message
    };
  }
}

const list = async (path) => {
  try {
    const req = await fetch(`${domain}/${path}`);
    const res = await req.text()
    return JSON.parse(res)
  } catch (error) {
    return {
      error: error.message
    };
  }
};


const read = async (path) => {
  const token = getToken();
  try {
    let req = await fetch(
      `${domain}/${path}`, {
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



const remove = async (id, path) => {
  const token = getToken();
  try {
    const req = await fetch(`${domain}/${path}/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    const res = await req.text()
    return JSON.parse(res)
  } catch (error) {
    return {
      error: error.message
    };

  }
};





const update = async (data, id, path) => {
  const token = getToken();
  try {
    const res = await axios.patch(
      `${domain}/${path}/${id}`, {
        user: data,
      }, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    return {
      error: error.response.data.error
    };
  }
};


export default {
  create,
  list,
  read,
  remove,
  update

}


//axios
// };import axios from "axios";
// import {
//   domain
// } from "./utils";
// import {
//   getToken
// } from "./auth";


// const create = async (data, path, id = "") => {
//   let res;
//   try {
//     if (!id) {
//       res = await axios.post(`${domain}/${path}`, data);
//     } else {
//       res = await axios.post(`${domain}/${path}/${id}`, data);
//     }
//     return res.data;
//   } catch (error) {
//     return {
//       error: error.response.data.message
//     };
//   }
// };

// const list = async (path) => {
//   try {
//     const res = await axios.get(`${domain}/${path}`);
//     return res.data;
//   } catch (error) {
//     return {
//       error: error.response.data.message
//     };
//   }
// };


// const read = async (path) => {
//   const token = getToken();
//   try {
//     const res = await axios.post(
//       `${domain}/${path}`,
//       null, {
//         headers: {
//           "Authorization": `Bearer ${token}`,
//         },
//       }
//     );
//     return res.data;
//   } catch (error) {
//     return {
//       error: error.response.data.message
//     };
//   }
// };

// const remove = async (id, path) => {
//   const token = getToken();
//   try {
//     const res = await axios.delete(`${domain}/${path}/${id}`, {
//       headers: {
//         "Authorization": `Bearer ${token}`,
//       },
//     });
//     return res.data;
//   } catch (error) {
//     return {
//       error: error.response.data.message
//     };

//   }
// };

// const update = async (data, id, path) => {
//   const token = getToken();
//   try {
//     const res = await axios.patch(
//       `${domain}/${path}/${id}`, {
//         user: data,
//       }, {
//         headers: {
//           "Authorization": `Bearer ${token}`,
//         },
//       }
//     );
//     return res.data;
//   } catch (error) {
//     return {
//       error: error.response.data.message
//     };
//   }
// };

// export default{
//   create,
//   list,
//   read,
//   remove,
//   update
// };