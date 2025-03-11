import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import { getTasks, createTask, completeTask, getTaskStats } from "../controllers/taskController";

const router = Router();

// Routes protected by `verifyToken`
router.get("/", verifyToken, getTasks);
router.post("/", verifyToken, createTask);
router.put("/:id", verifyToken, completeTask);
router.get("/stats", verifyToken, getTaskStats);

export default router;
