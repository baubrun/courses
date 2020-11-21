import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const hasAuthorization = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.json(false);
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.json(false);
    }
    next();
  } catch (error) {
    return res.json({
      msg: error.message,
    });
  }
};

export default {
  hasAuthorization,
};
