import express from "express";
import userController from "../controllers/user.js";
import authController from "../controllers/auth.js";

const router = express.Router();

router.route("/api/user")
  .post(
    authController.hasAuthorization,
    userController.read,
  )

  
router.route("/api/users")
  .get(userController.list)
  .post(userController.create);


router
  .route("/api/user/:userId")
  .get(
    authController.reqSignIn,
    userController.read
  )
  .patch(
    authController.hasAuthorization,
    userController.update,
  )
  .delete(
    authController.hasAuthorization,
    userController.remove
  );


  router.param('userId', userController.userById)



export default router;