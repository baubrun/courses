import config from "../config/index.js"
import bcrypt from "bcryptjs"
import User from "../models/user.js"
import jwt from "jsonwebtoken"


const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth
    if (!authorized) {
        return res.status(403).json({
            error: "Unauthorized."
        })
    }
    next();
};

const requireSignIn = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader.startsWith("Bearer ")) {
        const token = authHeader.substring(7, authHeader.length);
        const decoded = jwt.verify(token, config.jwtSecret)
        req.auth = decoded._id
        next()
    } else {
        return res.status(401).json({
            error: "Authorization not found."
        })
    }
}



const signIn = async (req, res) => {
    const {
        email,
        password
    } = req.body
    try {
        let user = await User.findOne({
            email: email
        });
        if (!user) {
            return res.status(401).json({
                error: "User not found.",
            });
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(401).json({
                error: "Invalid Email or password.",
            });
        } else {
            const token = jwt.sign({
                    _id: user.id
                },
                process.env.JWT_SECRET,
            )

            return res.status(200).json({
                token,
                user: {
                    instructor: user.instructor,
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                }
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};



export default {
    hasAuthorization,
    requireSignIn,
    signIn,
};