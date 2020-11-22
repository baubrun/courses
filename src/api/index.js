import axios from "axios";
import {
  domain
} from "./utils";
import {
  getToken
} from "./auth";


const create = async (data, path, id = "") => {
  let res;
  try {
    if (!id) {
      res = await axios.post(`${domain}/${path}`, data);
    } else {
      res = await axios.post(`${domain}/${path}/${id}`, data);
    }
    return res.data;
  } catch (error) {
    return {
      error: error.response.data.message
    };
  }
};

const list = async (path) => {
  try {
    const res = await axios.get(`${domain}/${path}`);
    return res.data;
  } catch (error) {
    return {
      error: error.response.data.message
    };
  }
};

const read = async (path) => {
  const token = getToken();
  try {
    const res = await axios.post(
      `${domain}/${path}`,
      null, {
        headers: {
          "Authorization": `Bearer ${token}`,
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

const remove = async (id, path) => {
  const token = getToken();
  try {
    const res = await axios.delete(`${domain}/${path}/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return {
      error: error.response.data.message
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
      error: error.response.data.message
    };
  }
};

export default{
  create,
  list,
  read,
  remove,
  update
};