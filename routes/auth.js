import express from "express";
import authController from "../controllers/auth.js";

const router = express.Router()


router.route("/auth/signIn")
  .post(
    authController.signIn)

  


export default router