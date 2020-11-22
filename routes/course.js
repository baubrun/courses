import express from "express";
import authController from "../controllers/auth.js";
import courseController from "../controllers/course.js";
import userController from "../controllers/user.js";
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


router.route('/api/courses/:courseId')
    .get(courseController.read)


// router.route("/api/courses/defaultImg")
//     .get(courseController.defaultImg);

router
    .route("/api/courses/photo/:courseId")
    .get(
        courseController.photo,
    )




router.param('userId', userController.userById)
router.param('courseId', courseController.courseByID)

export default router