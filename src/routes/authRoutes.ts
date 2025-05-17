import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
} from "../controllers/UserAuth";
import { protect } from "../middleware/authMiddleware";
import { validateRequest } from "../middleware/validateRequest";
import { registerSchema, loginSchema } from "../schemas/authSchema";

const router = express.Router()

router.post("/register",validateRequest(registerSchema),registerUser);
router.post("/login", validateRequest(loginSchema), loginUser);
router.get("/profile", protect, getProfile);

export default router;
