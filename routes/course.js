import express from "express";
import authController from "../controllers/auth.js";
import courseController from "../controllers/course.js";
import userController from "../controllers/user.js";
import {upload} from "../serverUtils/index.js"

const router = express.Router()


router.route("/api/courses/by/:userId")
    .get(courseController.list)
    .post(
        upload.any(),
        // authController.hasAuthorization,
        // userController.isInstructor,
        courseController.create,
    )


router.route("/api/users")
    .post(userController.create);




export default router