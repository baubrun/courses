import Course from "../models/course.js";
import path from "path";
import {valid_OId} from "./helper.js"



const courseByID = async (req, res, next) => {
    const id = req.params.courseId
  try {
    let course = await Course.findById(valid_OId(id)).populate("instructor", "_id name");

    if (!course)
      return res.status(400).json({
        error: "Course not found.",
      });
      req.course = course
      next()
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

const create = async (req, res) => {
  const {
    files,
    body: { name, description, category, instructor, published },
  } = req;

  const courseExists = await Course.findOne({
    name: name,
  });

  if (courseExists) {
    return res.status(401).json({
      message: "Course already exists.",
    });
  }

  try {
    let file = files[0];
    if (files.length < 1) {
      return res.status(400).json({
        message: "Image required.",
      });
    } else {
      const ext = path.extname(file.originalname);
      if (![".jpeg", ".jpg", ".png"].some((x) => x === ext)) {
        return res.status(400).json({
          message: "Invalid image type.",
        });
      }
    }

    const course = new Course({
      name: name,
      image: file.filename,
      // instructor: mongoose.Types.ObjectId(instructor),
      instructor: valid_OId(instructor),
      description: description,
      category: category,
      published: published,
    });

    await course.save();

    return res.status(200).json({
      name: course.name,
      image: file.originalname,
      instructor: course.instructor,
      description: course.description,
      category: course.category,
      published: course.published,
    });

  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const listByInstructor = async (req, res) => {
  try {
    const courses = await Course.find({
      instructor: req.params.userId,
    }).populate("instructor", "_id name");

    return res.status(200).json({courses: courses});
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

const newLesson = async (req, res) => {
  try {
    let lesson = req.body.lesson;
    let newLesson = await Course.findByIdAndUpdate(
      req.course._id,
      { $push: { lessons: lesson }, updated: Date.now() },
      { new: true }
    )
      .populate("instructor", "_id name")
      .exec();
    return res.status(200).json({newLesson: newLesson});
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
};

const read = (req, res) => {
  return res.status(200).json({course: req.course});
};

export default {
  create,
  courseByID,
  listByInstructor,
  newLesson,
  read,
};
