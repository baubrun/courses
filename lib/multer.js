import { diskStorage } from "multer"
import { extname } from "path"

const secs = new Date()
const uniqueSuffix =   Date.now() + secs.getSeconds() * Math.floor(Math.random() * 10000000)


const dest = process.env.NODE_ENV === "production"  
? "./build/images/" 
: "./public/images/"

const storage = diskStorage({
    destination: function (req, file, cb) {
        cb(null, dest)
    },
    filename: function (req, file, cb) {
        const ext = extname(file.originalname)
        const filename = file.originalname.split(".")[0]
        cb(null, `${filename}-${uniqueSuffix}${ext}`)
    }
})


export default {
    storage
}