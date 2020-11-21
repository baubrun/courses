// import jwt from "jsonwebtoken";
import expressJwt from "express-jwt"
import dotenv from "dotenv";
dotenv.config();

const hasAuthorization = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(403).json({
        mesage: error.message,
      });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.status(403).json({
        mesage: error.message,
      });
    }
    next();
  } catch (error) {
    return res.status(400).json({
      mesage: error.message,
    });
  }
};



// const hasAuthorization = (req, res, next) => {
//   const authorized = req.profile && req.auth &&
//     req.profile._id == req.auth._id
//   if (!(authorized)) {
//     return res.status(403).json({
//       error: "User is not authorized."
//     })
//   }
//   next();
// };


const reqSignIn = expressJwt({
  algorithms:   ["RS256"],
  secret: process.env.JWT_SECRET,
  userProperty: 'auth'
})




export default{
  hasAuthorization,
  reqSignIn,
};