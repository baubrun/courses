import express from "express";
import authController from "../controllers/auth.js";
import courseController from "../controllers/course.js";
import userController from "../controllers/user.js";
import mul from "../lib/multer.js"
import multer from "multer"
const upload = multer({
    storage: mul.storage
})

const router = express.Router()


router.route("/api/courses/published")
    .get(courseController.listPublished)

    
router.route("/api/courses/by/:userId")
    .get(
        authController.requireSignIn,
        authController.hasAuthorization,
        courseController.listByInstructor
    )
    .post(
        upload.any(),
        authController.requireSignIn,
        authController.hasAuthorization,
        userController.isInstructor,
        courseController.create,
    )


router.route("/api/courses/:courseId")
    .delete(
        authController.requireSignIn,
        courseController.isInstructor,
        courseController.remove,
    )
    .get(courseController.read)
    .patch(
        upload.any(),
        authController.requireSignIn,
        courseController.isInstructor,
        courseController.update,
    )

router.route("/api/courses/:courseId/lesson/new")
    .put(
        authController.requireSignIn,
        courseController.isInstructor,
        courseController.newLesson,
    )






router.param("userId", userController.userById)
router.param("courseId", courseController.courseByID)

export default router