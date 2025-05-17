import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getMyBlogs,
} from "../controllers/blogController";
import { protect } from "../middleware/authMiddleware";
import { validateRequest } from "../middleware/validateRequest";
import { createBlogSchema, updateBlogSchema } from "../schemas/blogSchema";

const router = express.Router();

// Public routes
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

// Protected routes
router.use(protect);
router.get("/my/blogs", getMyBlogs);
router.post(
  "/",
  validateRequest(createBlogSchema),
  createBlog
);
router.put(
  "/:id",
  
  validateRequest(updateBlogSchema),
  updateBlog
);
router.delete("/:id", deleteBlog);

export default router; 