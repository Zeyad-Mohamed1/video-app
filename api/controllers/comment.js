import Video from "../models/Video.js"
import Comment from "../models/Comment.js"
import { createError } from "../error.js"

export const addComment = async (req, res, next) => {
    const newComment = new Comment({
        userId: req.user.id,
        ...req.body
    })
    try {
        const savedComment = await newComment.save()
        res.status(200).json(savedComment)
    } catch (err) {
        next(err)
    }
}


export const getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ videoId: req.params.videoId })
        res.status(200).json(comments)
    } catch (err) {
        next(err)
    }
}

export const updateComment = async (req, res, next) => {
    // const id = req.user.id
}


export const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id)
        const video = await Video.findById(comment.videoId)
        if (req.user.id === comment.userId || req.user.id === video.userId) {
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json("Comment has been deleted")
        } else {
            return next(createError(403, "You can delete only your comment!"))
        }
    } catch (err) {
        next(err)
    }
}