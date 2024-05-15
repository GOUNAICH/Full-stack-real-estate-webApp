import express from "express";
import {
  getComments,
  addComment,
  updateComment,
  deleteComment,
  addReply,
  deleteReply,
} from "../controllers/comment.controller.js";


const router = express.Router();
router.get("/:postId", getComments);
router.post("/:postId", addComment);
router.put("/:commentId", updateComment);
router.delete("/:commentId", deleteComment);
router.post("/:commentId/replies", addReply);
router.delete("/replies/:replyId", deleteReply);



export default router;
