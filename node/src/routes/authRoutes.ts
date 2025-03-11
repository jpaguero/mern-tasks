import { Router } from "express";
import { body } from "express-validator";
import { register, login } from "../controllers/authController";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

// Register route with validation
router.post(
  "/register",
  [
    body("nickname")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Nickname must be at least 3 characters long."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
    validateRequest,
  ],
  register
);

// Login route with validation
router.post(
  "/login",
  [
    body("nickname").notEmpty().withMessage("Nickname is required."),
    body("password").notEmpty().withMessage("Password is required."),
    validateRequest,
  ],
  login
);

export default router;
