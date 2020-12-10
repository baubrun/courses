import mongoose from "mongoose"
import LessonSchema from "./lesson.js"




const CourseSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  image: {
    type: String,
    required: true

  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: true
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  instructor: {type: mongoose.Schema.ObjectId, ref: "User"},
  published: {
    type: Boolean,
    default: false
  },
  lessons: [LessonSchema]
})

export default mongoose.model("Course", CourseSchema)
