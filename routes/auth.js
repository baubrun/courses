import express from "express";
import userController from "../controllers/user.js";

const router = express.Router()


router.route("/auth/signIn")
  .post(
    userController.signIn)

  


export default router