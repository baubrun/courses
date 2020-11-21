import Course from "../models/course.js"
import fs from "fs"
import fileUpload from "express-fileupload"

const create = async (req, res, next) => {
    const {
        files,
        body: {
            name,
            description,
            category,
            published,
        }
    } = req


    const courseExists = await Course.findOne({
        name: name,
    })

    if (courseExists) {
        return res.status(401).json({
            message: "Course already exists."
        })
    }

    if (!files){
        return res.status(400).json({
            message: "File required. "
        })
    }

    const file = files.image
    file.mv(`${__dirname}public/uploads/${file.name}`, err => {
    // file.mv(`../public/uploads/${file.name}`, err => {
        if (err) {
            return res.status(500).json({
                message: err.message
            })
        }
 
    })

    const course = new Course({
        name: name,
        image: file,
        description: description,
        category: category,
        published: published,
    })


    try {
        await course.save()
        return res.json({
            name: course.name,
            image: course.image,
            description: course.description,
            category: course.category,
            published: course.published,

        })

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })

    }

}


const list = async (req, res) => {
    try {
        let courses = await Course.find().select("-__v")
        return res.json(courses)
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}




export default {
    create,
    list,
}