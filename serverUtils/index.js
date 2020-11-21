import multer from "multer"
import path from "path"
import fs from "fs"


export const SALT = 10
const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1000)




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploadsTemp/")
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        cb(null, file.fieldname + "-" + uniqueSuffix + ext)
    }
})


export const upload = multer({
    storage: storage
});



export const moveFilesToApp = () => {

    let rootPath = process.cwd()
    let imgPath = rootPath + "/uploadsTemp"
    let newPath = rootPath + "/src/uploads"
    let found = []
    try {
        fs.readdir(imgPath, (err, files) => {
            if (err) {
                throw err
            }
            files.forEach(f => {
                found.push(f)
            })

            found.forEach(f => {
                fs.rename(`${imgPath}/${f}`, `${newPath}/${f}`, (err) => {
                    if (err) {
                        throw err
                    }
                })
            })

        })
    } catch (error) {
        console.log("error: moveFilesToApp", error)
    }

}