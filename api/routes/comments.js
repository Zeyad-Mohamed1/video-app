import express from 'express'
import { verifyToken } from '../verifyToken.js';
import { addComment, deleteComment, getComments, updateComment } from '../controllers/comment.js';

const router = express.Router()

router.get("/:videoId", getComments)
router.post("/", verifyToken, addComment)
router.put("/:id", verifyToken, updateComment)
router.delete("/:id", verifyToken, deleteComment)


export default router;