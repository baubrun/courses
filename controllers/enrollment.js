import Enrollment from "../models/enrollment.js";
import path from "path";
import {
    valid_OId
} from "./helper.js"



const complete = async (req, res) => {
    const {
        lessonStatusId,
        courseCompleted,
        complete,
        lesson,
    } = req.body
    console.log('req.body :>> ', req.body);
    let newData = {
    }
    newData['lessonStatus.$.complete'] = complete 

    newData.updated = Date.now()
    if (courseCompleted){
        newData.completed = courseCompleted
    }
    console.log('newData :>>', newData)

    try {
        await Enrollment
            .updateOne({
                "lessonStatus._id": lessonStatusId
            }, {
                "$set": newData
            })

        const updatedData = await Enrollment.findById(lessonStatusId)
        return res.status(200).json({
            enrollment: updatedData
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


const enrollmentByID = async (req, res, next) => {
    const id = valid_OId(req.params.enrollmentId)

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
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}


const isStudent = (req, res, next) => {
    const student = req.auth &&
        req.auth == req.enrollment.student._id
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
                student: req.auth
            })
            .sort({
                "completed": 1
            })
            .populate("course", "_id name image category")
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

const readStats = async (req, res) => {
    try {
        let stats = {}
        stats.totalEnrolled = await Enrollment.find({
            course: req.course._id
        }).countDocuments()

        stats.totalCompleted = await Enrollment.find({
            course: req.course._id
        }).exists("completed", true).countDocuments()

        return res.json({stats})
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}



export default {
    complete,
    create,
    read,
    enrollmentByID,
    findEnrollment,
    isStudent,
    listEnrolled,
    readStats,
}