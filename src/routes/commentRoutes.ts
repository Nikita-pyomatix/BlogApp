import express from "express";
import { protect } from "../middleware/authMiddleware";
import { validateRequest } from "../middleware/validateRequest";
import {
  createComment,
  getBlogComments,
  updateComment,
  deleteComment,
  createReply,
  updateReply,
  deleteReply
} from "../controllers/commentController";
import {
  createCommentSchema,
  createReplySchema,
  updateCommentSchema,
  updateReplySchema
} from "../schemas/commentSchema";

const router = express.Router();

// Comment routes
router.get("/blog/:blogId", getBlogComments);
router.post(
  "/",
  protect,
  validateRequest(createCommentSchema),
  createComment
);
router.put(
  "/:id",
  protect,
  validateRequest(updateCommentSchema),
  updateComment
);
router.delete("/:id", protect, deleteComment);

// Reply routes
router.post(
  "/reply",
  protect,
  validateRequest(createReplySchema),
  createReply
);
router.put(
  "/reply/:id",
  protect,
  validateRequest(updateReplySchema),
  updateReply
);
router.delete("/reply/:id", protect, deleteReply);

export default router; 