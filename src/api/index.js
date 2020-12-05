import axios from "axios";
import {
  domain
} from "./utils";
import {
  isAuthenticated
} from "./auth";




const read = async (path) => {
  const token = isAuthenticated();
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
  const token = isAuthenticated();
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
  const token = isAuthenticated();
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

