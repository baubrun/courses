import express from "express";
import authController from "../controllers/auth.js";
import courseController from "../controllers/course.js";
import enrollmentController from "../controllers/emrollment.js";


const router = express.Router();


router.route("/api/enrollment/enrolled")
.get(
    authController.requireSignIn, 
    enrollmentController.listEnrolled,
)

router.route("/api/enrollment/new/:courseId")
.get(
    authController.requireSignIn, 
    enrollmentController.create,
    enrollmentController.read,
)

router.route("/api/enrollment/:enrollmentId")
.get(
    authController.requireSignIn, 
    enrollmentController.isStudent,
    enrollmentController.read
)
.put(
    authController.requireSignIn, 
    enrollmentController.isStudent, 
    enrollmentController.complete
    ) 



router.param("courseId", courseController.courseByID)
router.param("enrollmentId", enrollmentController.enrollmentByID)




export default router