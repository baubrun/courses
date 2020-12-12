import express from "express";
import authController from "../controllers/auth.js";
import courseController from "../controllers/course.js";
import enrollmentController from "../controllers/enrollment.js";


const router = express.Router();


router.route("/api/enrollment/enrolled")
    .get(
        authController.requireSignIn,
        enrollmentController.listEnrolled,
    )

router.route("/api/enrollment/new/:courseId")
    .post(
        authController.requireSignIn,
        enrollmentController.findEnrollment,
        enrollmentController.create,
    )

router.route('/api/enrollment/complete/:enrollmentId')
    .put(
        authController.requireSignIn, 
        enrollmentController.isStudent,
        enrollmentController.complete
        )



router.route("/api/enrollment/stats/:courseId")
    .get(enrollmentController.readStats)


router.route("/api/enrollment/:enrollmentId")
    .get(
        authController.requireSignIn,
        enrollmentController.isStudent,
        enrollmentController.read
    )



router.param("courseId", courseController.courseByID)
router.param("enrollmentId", enrollmentController.enrollmentByID)




export default router