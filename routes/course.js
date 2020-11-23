import express from "express";
import authController from "../controllers/auth.js";
import courseController from "../controllers/course.js";
import userController from "../controllers/user.js";
import user from "../models/user.js";
import {
    upload
} from "../serverUtils/index.js"

const router = express.Router()


router.route("/api/courses/by/:userId")
    .get(
        // authController.reqSignIn,
        // authController.hasAuthorization,
        courseController.listByInstructor
    )
    .post(
        upload.any(),
        // authController.hasAuthorization,
        // userController.isInstructor,
        courseController.create,
    )


router.route("/api/courses/:courseId")
    .get(courseController.read)


router.route("/api/courses/:courseId/lesson/new")
    .put(
        authController.reqSignIn,
        userController.isInstructor,
        courseController.newLesson,
    )











router.param("userId", userController.userById)
router.param("courseId", courseController.courseByID)

export default router