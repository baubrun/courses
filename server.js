import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import userRoutes from "./routes/user.js"
import authRoutes from "./routes/auth.js"
import courseRoutes from "./routes/course.js"
import enrollmentRoutes from "./routes/enrollment.js"
import config from "./config/index.js"



const app = express()


const PORT = config.port
const options = {
    dbName: "Classroom",
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}


/* =======================
Middleware
=========================*/
app.use(express.json({
    limit: "25mb"
}))
app.use(express.urlencoded({
    extended: true
}))


app.use(cors())



app.use("/", userRoutes)
app.use("/", authRoutes)
app.use("/", courseRoutes)
app.use("/", enrollmentRoutes)
app.use("/", express.static("build"))


/* =======================
Mongoose
=========================*/
mongoose.connect(config.mongoUri, options)
    .then(app.listen(PORT, () => {
        console.log("\nConnected to DB!\n")
        console.log("\nServer running on port:", PORT, "\n")
    }))
    .catch((err) => console.error(err))

mongoose.set("useFindAndModify", false);