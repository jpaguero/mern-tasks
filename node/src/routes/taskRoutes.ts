import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import { getTasks, createTask, completeTask, getTaskStats } from "../controllers/taskController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Endpoints related to task management
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retrieves all tasks for the authenticated user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   status:
 *                     type: string
 *                     enum: [pending, completed]
 *                   user:
 *                     type: string
 *                     description: User ID who owns the task
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized, missing or invalid token
 */
router.get("/", verifyToken, getTasks);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Creates a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Buy groceries"
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Invalid input, missing title
 *       401:
 *         description: Unauthorized, missing or invalid token
 */
router.post("/", verifyToken, createTask);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Marks a task as completed
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to update
 *     responses:
 *       200:
 *         description: Task marked as completed
 *       400:
 *         description: Invalid task ID
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized, missing or invalid token
 */
router.put("/:id", verifyToken, completeTask);

/**
 * @swagger
 * /tasks/stats:
 *   get:
 *     summary: Retrieves task statistics (completed vs pending)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved task statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 5
 *                 completed:
 *                   type: integer
 *                   example: 3
 *                 pending:
 *                   type: integer
 *                   example: 2
 *       401:
 *         description: Unauthorized, missing or invalid token
 */
router.get("/stats", verifyToken, getTaskStats);

export default router;
