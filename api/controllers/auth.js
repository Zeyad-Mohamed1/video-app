import { createError } from "../error.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(12)
        const hash = bcrypt.hashSync(req.body.password, salt)
        const newUser = new User({ ...req.body, password: hash })

        await newUser.save()
        res.status(201).json("User has been created.")
    } catch (err) {
        next(err);
    }
}

export const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({ name: req.body.name })
        if (!user) return next(createError(404, "User not found"))

        const isCorrect = await bcrypt.compare(req.body.password, user.password)

        if (!isCorrect) return next(createError(400, "Wrong credentials"))

        const token = jwt.sign({ id: user._id }, process.env.JWT_PASS, { expiresIn: "4d" })

        const { password, ...others } = user._doc;

        res.cookie("access_token", token, { httpOnly: true }).status(200).json(others)
    } catch (err) {
        next(err);
    }
}

export const googleAuth = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_PASS, { expiresIn: "4d" })
            res.cookie("access_token", token, { httpOnly: true }).status(200).json(user._doc)
        } else {
            const newUser = new User({ ...req.body, fromGoogle: true })
            await newUser.save()
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_PASS, { expiresIn: "4d" })
            res.cookie("access_token", token, { httpOnly: true }).status(200).json(newUser._doc)
        }
    } catch (err) {
        next(err)
    }
}