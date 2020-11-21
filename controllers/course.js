import Course from "../models/course.js"
import onFinished from "on-finished"
import {
    moveFilesToApp
} from "../serverUtils/index.js"

import path from "path"
import fs from "fs"

// export const moveFilesToApp = () => {

//     let rootPath = process.cwd()
//     // console.log('rootPath :>> ', rootPath);
//     let imgPath = rootPath + "/uploads"
//     let newPath = rootPath + "/src/uploads"
//     let found = []
//     try {
//         fs.readdir(imgPath, (err, files) => {
//             if (err) {
//                 throw err
//             }
//             files.forEach(f => {
//                 found.push(f)
//             })

//             found.forEach(f => {
//                 fs.rename(`${imgPath}/${f}`, `${newPath}/${f}`, (err) => {
//                     if (err) {
//                         throw err
//                     }
//                 })
//             })

//         })
//     } catch (error) {
//         console.log('error: moveFilesToApp', error)
//     }

// }


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

    console.log('files :>> ', files);
    console.log("***************\n")
    console.log('body :>> ', req.body);

    const courseExists = await Course.findOne({
        name: name,
    })

    if (courseExists) {
        return res.status(401).json({
            message: "Course already exists."
        })
    }

    try {
        let file = files[0]
        if (files.length < 1) {
            return res.status(400).json({
                message: "Image required."
            })
        } 
        // else {
        //     if (file.mimetype !== "image/jpeg" || "image/jpg" || "image/png") {
        //     // if (file.mimetype === "image/jpeg") {
        //         return res.status(400).json({
        //             message: "Invalid image type."
        //         })

        //     }
        // }


        const course = new Course({
            name: name,
            image: file.filename,
            description: description,
            category: category,
            published: published,
        })

        await course.save()
        res.status(200).json({
            name: course.name,
            image: course.image,
            description: course.description,
            category: course.category,
            published: course.published,
        })

        onFinished(res, (error) => {
            if (error) {
                return res.status(400).json({
                    message: error.message
                })
            } else {
                moveFilesToApp()
            }
            return
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