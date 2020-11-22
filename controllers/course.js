import Course from "../models/course.js";
import onFinished from "on-finished";
import { moveFilesToApp } from "../serverUtils/index.js";
import path from "path";
import mongoose from "mongoose";

const courseByID = async (req, res, next, id) => {
  try {
    let course = await Course.findById(id).populate("instructor", "_id name");

    if (!course)
      return res.status(400).json({
        error: "Course not found.",
      });
    req.course = course;

    next();
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

const create = async (req, res, next) => {
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
      instructor: mongoose.Types.ObjectId(instructor),
      description: description,
      category: category,
      published: published,
    });

    await course.save();

    res.status(200).json({
      name: course.name,
      image: file.originalname,
      instructor: course.instructor,
      description: course.description,
      category: course.category,
      published: course.published,
    });

    onFinished(res, (error) => {
      if (error) {
        return res.status(400).json({
          message: error.message,
        });
      } else {
        moveFilesToApp();
      }
      return;
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const photo = (req, res) => {
  if (req.course.image.data) {
    res.set("Content-Type", req.course.image.contentType);
    return res.send(req.course.image.data);
  }
};

const listByInstructor = async (req, res) => {
  try {
    const courses = await Course.find({
      instructor: req.profile,
    }).populate("instructor", "_id name");

    return res.status(200).json(courses);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const read = (req, res) => {
  req.course.image = undefined;
  return res.json(req.course);
};

export default {
  create,
  courseByID,
  listByInstructor,
  photo,
  read,
};
