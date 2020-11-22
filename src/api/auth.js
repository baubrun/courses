

const deleteToken = () => {
  localStorage.removeItem("jwt")
};


const isAuthenticated = () => {
  let token = JSON.parse(localStorage.getItem("jwt"))
  if (!token) {
    return false
  } else {
    return token

  }
};


const setToken = (jwt, cb) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(jwt));
  }
  cb();
};





export {
  deleteToken,
  isAuthenticated,
  setToken,
};