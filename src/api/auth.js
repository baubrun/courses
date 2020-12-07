const deleteToken = () => {
  sessionStorage.removeItem("jwt")
};


const isAuthenticated = () => {
  if (typeof window == "undefined")
  return false

  let token = JSON.parse(sessionStorage.getItem("jwt"))
  if (token) {
    return token
  } else {
    return false
  }
};

const isAuthorized = (id, resource) => {
  return id === resource
}

const setToken = (jwt) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("jwt", JSON.stringify(jwt));
  }
};





export default {
  deleteToken,
  isAuthenticated,
  isAuthorized,
  setToken,
};