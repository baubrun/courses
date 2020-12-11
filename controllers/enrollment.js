import Enrollment from "../models/enrollment.js";
import path from "path";
import {
    valid_OId
} from "./helper.js"



const complete = async (req, res) => {
    const {
        lessonStatusId,
        courseCompleted,
        complete
    } = req.body
    let updatedData = {}
    updatedData["lessonStatus.$.complete"] = complete
    updatedData.updated = Date.now()

    if (courseCompleted)
        updatedData.completed = courseCompleted

    try {
        const enrollment = await Enrollment
            .updateOne({
                "lessonStatus._id": lessonStatusId
            }, {
                "$set": updatedData
            })
        return res.json({
            enrollment
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}



const create = async (req, res) => {
    let newEnrollment = {
        course: req.course,
        student: req.auth,
    }
    newEnrollment.lessonStatus =
        req.course.lessons.map((lesson) => {
            return {
                lesson: lesson,
                complete: false
            }
        })
    const enrollment = new Enrollment(newEnrollment)
    try {
        const enrollmentSaved = await enrollment.save()
        return res.status(200).json({
            enrollment: enrollmentSaved
        })
    } catch (err) {
        return res.status(500).json({
            error: error.message
        });
    }
}


const enrollmentByID = async (req, res, next, id) => {
    try {
        const enrollment = await Enrollment.findById(id)
            .populate({
                path: "course",
                populate: {
                    path: "instructor"
                }
            })
            .populate("student", "_id name")
        if (!enrollment)
            return res.status(400).json({
                error: "Enrollment not found."
            })
        req.enrollment = enrollment
        next()
    } catch (error) {
        return res.status(400).json({
            error: "Could not retrieve enrollment status."
        })
    }
}



const findEnrollment = async (req, res, next) => {
    try {
        let enrollment = await Enrollment.findOne({
            course: req.course._id,
            student: req.auth._id
        })
        if (!enrollment) {
            next()
        } else {
            res.json({
                enrollment
            })
        }
    } catch (err) {
        return res.status(500).json({
            error: error.message
        });
    }
}


const isStudent = (req, res, next) => {
    const student = req.auth &&
        req.auth._id == req.enrollment.student._id
    if (!student) {
        return res.status(403).json({
            error: "User is not enrolled."
        })
    }
    next()
}


const listEnrolled = async (req, res) => {
    try {
        let enrollments = await Enrollment
            .find({
                student: req.auth._id
            })
            .sort({
                "completed": 1
            })
            .populate("course", "_id name category")
        return res.json({
            enrollments
        })
    } catch (err) {
        return res.status(500).json({
            error: error.message
        });
    }
}


const read = (req, res) => {
    return res.json({
        enrollment: req.enrollment
    })
}


export default {
    complete,
    create,
    read,
    enrollmentByID,
    findEnrollment,
    isStudent,
    listEnrolled,
}