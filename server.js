import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import compress from "compression"
import helmet from "helmet"
import userRoutes from "./routes/user.js"
import authRoutes from "./routes/auth.js"
import courseRoutes from "./routes/course.js"
import fileUpload from "express-fileupload"

const app = express()
dotenv.config()


const PORT = process.env.PORT || 5000
const options = {
    dbName: "Classroom",
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}


/* =======================
Middleware
=========================*/
app.use(express.json({limit: "25mb"}))
app.use(express.urlencoded({
    extended: true
}))
app.use(compress())
app.use(helmet())
app.use(cors())
app.use(fileUpload())

app.use("/", userRoutes)
app.use("/", authRoutes)
app.use("/", courseRoutes)




// express-jwt error handling
app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        res.status(401).json({
            "error": err.name + ": " + err.message
        })
    } else if (err) {
        res.status(400).json({
            "error": err.name + ": " + err.message
        })
        console.log(err)
    }
})

/* =======================
Mongoose
=========================*/
mongoose.connect(process.env.MONGODB_URI, options)
    .then(app.listen(PORT, () => {
        console.log("\nConnected to DB!\n")
        console.log("\nServer running on port:", PORT, "\n")
    }))
    .catch((err) => console.error(err))

mongoose.set("useFindAndModify", false);