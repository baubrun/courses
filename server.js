import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import userRoutes from "./routes/user.js"
import authRoutes from "./routes/auth.js"
import courseRoutes from "./routes/course.js"
import config from "./config/index.js"
import {
    expressCspHeader,
    NONCE,
    INLINE,
    SELF
} from 'express-csp-header'

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

app.use((error, req, res, next) => {
    if (error.name === "UnauthorizedError") {
        return res.status(401).json({
            message: error.name + ": " + error.message
        })
    } else if (error) {
        return res.status(400).json({
            message: error.name + ": " + error.message
        })
    }
})


app.use("/", userRoutes)
app.use("/", authRoutes)
app.use("/", courseRoutes)
app.use("/", express.static("build"))
app.use(expressCspHeader({
    directives: {
        'default-src': [SELF],
        'script-src': [SELF, NONCE,],
        'style-src': [SELF, 'https://fonts.googleapis.com', INLINE],
        'img-src': ['*'],
        'font-src': [SELF, 'https://fonts.gstatic.com', 'https://fonts.googleapis.com'],

    }
}))


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