import mongoose from "mongoose"

const LessonSchema = mongoose.Schema({
    title: String,
    content: String,
    resource_url: String
})


export default LessonSchema

