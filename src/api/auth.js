
const deleteToken = () => {
  localStorage.removeItem("auth-token")
};


const getToken = () => {
  let token = JSON.parse(localStorage.getItem("auth-token"))
  return token
};


const setToken = (jwt, cb) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("auth-token", JSON.stringify(jwt));
  }
  cb();
};





export {
  deleteToken,
  getToken,
  setToken,
};