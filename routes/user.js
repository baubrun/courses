import express from "express";
import userController from "../controllers/user.js";
import authController from "../controllers/auth.js";

const router = express.Router();

router.route("/api/users")
  .get(userController.list)
  .post(userController.create);


router
  .route("/api/users/:userId")
  .delete(
    authController.hasAuthorization,
    userController.remove
  )
  .get(
    authController.requireSignIn,
    userController.read
  )
  .patch(
    authController.requireSignIn,
    authController.hasAuthorization,
    userController.update,
  )



router.param("userId", userController.userByID)


export default router;