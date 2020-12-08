import Course from "../models/course.js";
import path from "path";
import {
  valid_OId
} from "./helper.js"



const courseByID = async (req, res, next) => {
  const id = req.params.courseId
  try {
    let course = await Course.findById(valid_OId(id)).populate("instructor", "_id name");

    if (!course)
      return res.status(400).json({
        error: "Course not found."
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
    body: {
      name,
      description,
      category,
      instructor,
      published
    },
  } = req;

  const courseExists = await Course.findOne({
    name: name,
  });

  if (courseExists) {
    return res.status(401).json({
      error: "Course already exists.",
    });
  }

  try {
    let file = files[0];
    if (files.length < 1) {
      return res.status(400).json({
        error: "Image required.",
      });
    } else {
      const ext = path.extname(file.originalname);
      const regexList = [/\.jpe?g/i, /\.png/i, /\.svg/i]
      if (regexList.some((x) => x === ext)) {
        return res.status(400).json({
          error: "Invalid image type.",
        });
      }
    }

    const course = new Course({
      name: name,
      image: file.filename,
      instructor: valid_OId(instructor),
      description: description,
      category: category,
      published: published,
    });

    const newCourse = await course.save();

    return res.status(200).json({
      course: newCourse
    });

  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};


const listByInstructor = async (req, res) => {
  try {
    const courses = await Course.find({
      instructor: req.profile._id,
    }).populate("instructor", "_id name");
    return res.status(200).json({
      courses: courses
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};


const isInstructor = (req, res, next) => {
  const isInstructor = req.course.instructor._id == req.auth._id
  if (!isInstructor) {
    return res.status(403).json({
      error: "User is not authorized."
    })
  }
  next()
}


const newLesson = async (req, res) => {
  try {
    let lesson = req.body;
    let newLesson = await Course.findByIdAndUpdate(
        req.course._id, {
          $push: {
            lessons: lesson
          },
          updated: Date.now()
        }, {
          new: true
        }
      )
      .populate("instructor", "_id name")
      .exec();
    return res.status(200).json({
      newLesson: newLesson
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
};

const read = (req, res) => {
  return res.status(200).json({
    course: req.course
  });
};

const remove = async (req, res) => {
  try {
    let course = req.course
    await course.remove()
    return res.status(200).json({
      success: true
    })
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
}

const update = async (req, res) => {

  const {
    files,
    body: {
      name,
      description,
      category,
      instructor,
      published,
    },
  } = req;

  try {
    let file = files[0];
    if (files.length < 1) {
      return res.status(400).json({
        error: "Image required.",
      });
    } else {
      const ext = path.extname(file.originalname);
      const regexList = [/\.jpe?g/i, /\.png/i, /\.svg/i]
      if (regexList.some((x) => x === ext)) {
        return res.status(400).json({
          error: "Invalid image type.",
        });
      }
    }


    const updated = await Course.findOneAndUpdate({
      _id: req.params.courseId
    },{
      name: name,
      image: file.filename,
      instructor: valid_OId(instructor),
      description: description,
      category: category,
      published: published,
    })

    return res.status(200).json({
      course: updated
    })
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });

  }


}

export default {
  create,
  courseByID,
  isInstructor,
  listByInstructor,
  newLesson,
  read,
  remove,
  update,
};