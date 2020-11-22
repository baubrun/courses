import jwt from "jsonwebtoken";
import expressJwt from "express-jwt"
import dotenv from "dotenv";
dotenv.config();

// const hasAuthorization = async (req, res, next) => {
//   try {
//     const token = req.header("x-auth-token");
//     if (!token) {
//       return res.status(403).json({
//         message: error.message,
//       });
//     }
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     if (!verified) {
//       return res.status(403).json({
//         message: error.message,
//       });
//     }
//     next();
//   } catch (error) {
//     return res.status(400).json({
//       message: error.message,
//     });
//   }
// };



const hasAuthorization = (req, res, next) => {
  console.log("req.profile hasAuthorization:>> ", req.profile);
  console.log("req.auth hasAuthorization :>> ", req.auth);
  const authorized = req.profile && req.auth &&
    req.profile._id == req.auth._id
  if (!(authorized)) {
    return res.status(403).json({
      message: "User is not authorized."
    })

  }
  next();
};


const reqSignIn = expressJwt({
  algorithms:   ["HS256"],
  secret: process.env.JWT_SECRET,
  // userProperty: "auth",
  requestProperty: "auth"
})




export default{
  hasAuthorization,
  reqSignIn,
};