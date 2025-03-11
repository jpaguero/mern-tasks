import { Router } from "express";
import { body } from "express-validator";
import { register, login, refreshToken, logout } from "../controllers/authController";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints related to user authentication
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registers a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nickname
 *               - password
 *             properties:
 *               nickname:
 *                 type: string
 *                 example: "newuser"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input data
 *       409:
 *         description: User already exists
 */
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



/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Logs in a user and returns JWT tokens
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nickname
 *               - password
 *             properties:
 *               nickname:
 *                 type: string
 *                 example: "testuser"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Incorrect credentials
 */
router.post(
  "/login",
  [
    body("nickname").notEmpty().withMessage("Nickname is required."),
    body("password").notEmpty().withMessage("Password is required."),
    validateRequest,
  ],
  login
);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Generates a new Access Token using the Refresh Token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIs..."
 *     responses:
 *       200:
 *         description: New Access Token generated successfully
 *       400:
 *         description: Missing or invalid Refresh Token
 *       403:
 *         description: Expired or unauthorized Refresh Token
 */
router.post("/refresh", refreshToken);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logs out the user and invalidates the Refresh Token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIs..."
 *     responses:
 *       200:
 *         description: Logout successful
 *       400:
 *         description: Missing or invalid Refresh Token
 *       403:
 *         description: Expired or unauthorized Refresh Token
 */
router.post("/logout", logout);

export default router;
