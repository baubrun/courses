const isAuthorized = (profile, user) => {
  return profile === user
}


const deleteToken = () => {
  localStorage.removeItem("jwt")
};


const getToken = () => {
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
  getToken,
  isAuthorized,
  setToken,
};