import User from "../models/user.js"
import _ from "lodash"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


const SALT = 10


const create = async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;

    const emailExists = await User.findOne({
        email: email
    })

    if (emailExists) {
        return res.status(401).json({
            error: "User already registered."
        })
    }

    const hashedPassword = await bcrypt.hash(password, SALT)

    const user = new User({
        email: email,
        name: name,
        password: hashedPassword,
    })
    try {
        await user.save()
        const token = jwt.sign({
            _id: user.id
        },
        process.env.JWT_SECRET,
    )

        return res.status(200).json({
            user, token
        })
    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
}

const isInstructor = (req, res, next) => {
    const isInstructor = req.profile.instructor
    if (!isInstructor) {
        return res.status(403).json({
            error: "User is not an isInstructor."
        })
    }
    next()
}



const list = async (req, res) => {
    try {
        let users = await User.find().select("-password -__v")
        return res.status(200).json({
            users
        })
    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
}




const read = (req, res) => {
    req.profile.password = undefined
    req.profile.__v = undefined
    return res.status(200).json({user: req.profile})
}



const remove = async (req, res) => {
    try {
        const user = req.profile
        let deletedUser = await user.remove()
        deletedUser.password = undefined
        return res.status(200).json(deletedUser)
    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
}



const update = async (req, res) => {
    const {
        user
    } = req.body
    try {
        let newPassword = user.password
        const newHashedPassword = await bcrypt.hash(newPassword, SALT)

        let updatedUser = await User.findOneAndUpdate({
            _id: user._id
        }, {
            instructor: user.instructor,
            email: user.email ? user.email : undefined,
            name: user.name ? user.name : undefined,
            password: user.password ? newHashedPassword : undefined,
            updated: Date.now(),
        }, {
            new: true,
            omitUndefined: true,
        })

        return res.status(200).json({
            user: {
                created: updatedUser.created,
                instructor: updatedUser.instructor,
                email: updatedUser.email,
                _id: updatedUser._id,
                name: updatedUser.name,
            }
        })
    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
}


const userByID = async (req, res, next, id) => {
    try {
        let user = await User.findById(id)
        if (!user)
            return res.status(400).json({
                error: "User not found."
            })
        req.profile = user
        next()
    } catch (error) {
        return res.status(400).json({
            error: "Could not retrieve user."
        })
    }
}


export default {
    create,
    list,
    isInstructor,
    read,
    remove,
    update,
    userByID,
}