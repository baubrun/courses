import express from "express";
import authController from "../controllers/auth.js";
import courseController from "../controllers/course.js";
import userController from "../controllers/user.js";
import {
    upload
} from "../serverUtils/index.js"

const router = express.Router()



router.route('/api/courses/:courseId')
    .get(courseController.read)
router.param('courseId', courseController.courseByID)


router.route("/api/users")
    .post(userController.create);


router.route("/api/courses/by/:userId")
    .get(courseController.listByInstructor)
    .post(
        upload.any(),
        // authController.hasAuthorization,
        // userController.isInstructor,
        courseController.create,
    )



export default router