import jwt from "jsonwebtoken";
import expressJwt from "express-jwt"
import dotenv from "dotenv";
dotenv.config();


const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth &&
    req.profile._id == req.auth._id
  if (!(authorized)) {
    return res.status(403).json({
      error: "User is not authorized."
    })
  }
  next();
};


const reqSignIn = expressJwt({
  algorithms:   ["HS256"],
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
})




export default{
  hasAuthorization,
  reqSignIn,
};