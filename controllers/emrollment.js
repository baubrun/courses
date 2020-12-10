import Enrollment from "../models/enrollment.js";
import path from "path";
import {
    valid_OId
} from "./helper.js"


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
            res.json({enrollment})
        }
    } catch (err) {
        return res.status(500).json({
            error: error.message
        });
    }
}


const listEnrolled = async (req, res) => {
    try {
      let enrollments = await Enrollment
        .find({student: req.auth._id})
        .sort({"completed": 1})
        .populate("course", "_id name category")
      return res.json({enrollments})
    } catch (err) {
      return res.status(500).json({
        error: error.message
    });
}
  }


const read = (req, res) => {
    return res.json(req.enrollment)
}


export default {
    create,
    read,
    enrollmentByID,
    findEnrollment,
    listEnrolled,
}