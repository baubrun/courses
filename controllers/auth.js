import expressJwt from "express-jwt"
import config from "../config/index.js"
import bcrypt from "bcryptjs"
import User from "../models/user.js"
import jwt from "jsonwebtoken"


const hasAuthorization = (req, res, next) => {
    console.log('req.profile hasAuthorization :>> ', req.profile);
    console.log('req.auth  hasAuthorization:>> ', req.auth);
    console.log('hasAuthorization :>>', req.profile._id == req.auth._id)
    const authorized = req.profile._id == req.auth._id
    if (!authorized) {
        return res.status(403).json({
            error: "User is not authorized."
        })
    }
    next();
};


const requireSignIn = expressJwt({
    algorithms: ["HS256"],
    secret: config.jwtSecret,
    userProperty: "auth",
})


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