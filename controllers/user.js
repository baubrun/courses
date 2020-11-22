import User from "../models/user.js"
import _ from "lodash"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import {
    SALT
} from "../serverUtils/index.js"
import jwt from "jsonwebtoken";
dotenv.config()

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
            message: "User already registered."
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
        return res.status(200).json({
            message: "Successfully registered."
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}


const list = async (req, res) => {
    try {
        let users = await User.find().select("-password -__v")
        return res.status(200).json(users)
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}


const isInstructor = async (req, res, next) => {
    const {
        instructor
    } = req.body
    if (!instructor) {
        return res.status(403).json({
            message: "User is not an instructor."
        })
    }
    next()
}


const read = async (req, res) => {
    const token = req.header("x-auth-token")
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    try {
        let user = await User.findById(verified._id).select("-password -__v")
        if (user) {
            return res.json({
                user: user
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}


const remove = async (req, res, next) => {
    try {
        const user = req.profile
        let deletedUser = await user.remove()
        deletedUser.password = undefined
        return res.json(deletedUser)
    } catch (error) {
        return res.status(400).json({
            message: error.message
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
            email: email,
        });

        if (!user) {
            return res.status(401).json({
                message: "User not found.",
            });
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(401).json({
                message: "Invalid Email or password.",
            });
        } else {
            const token = jwt.sign({
                    _id: user.id
                },
                process.env.JWT_SECRET, {
                    expiresIn: "24h"
                }
            )

            return res.json({
                token,
                user: {
                    created: user.created,
                    instructor: user.instructor,
                    email: user.email,
                    _id: user._id,
                    name: user.name,
                }
            });
        }

    } catch (error) {
        return res.status(401).json({
            message: error.message
        });
    }
};



const signOut = async (req, res) => {
    return res.status(200).json({
        message: "Signed out."
    })
};


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

        return res.json({
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
            message: error.message
        })
    }
}
const userById = async (req, res, next, id) => {
    console.log('id userById Ctrl :>> ', id);
    try {
      let user = await User.findById(id)
      if (!user)
        return res.status(400).json({
          error: "User not found."
        })
      req.profile = user
      console.log('req.profile', req.profile)
      next()
    } catch (err) {
      return res.status(400).json({
        error: "Could not retrieve user."
      })
    }
  }
  

export default {
    create,
    read,
    list,
    isInstructor,
    remove,
    signIn,
    signOut,
    update,
    userById,
}