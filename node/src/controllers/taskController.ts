import { Request, Response, NextFunction } from "express";
import Task from "../models/Task";
import ApiError from "../utils/apiError";
import { AuthRequest } from "../middlewares/authMiddleware";

// Get tasks by user
export const getTasks = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const tasks = await Task.find({ user: req.user?.id });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// Create new task
export const createTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { title } = req.body;
    if (!title) {
      throw new ApiError("Title is required", 400);
    }

    const newTask = new Task({ title, user: req.user?.id });
    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

// Mark task as completed
export const completeTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id, user: req.user?.id });

    if (!task) {
      throw new ApiError("Task not found", 404);
    }

    task.status = "completed";
    await task.save();

    res.json(task);
  } catch (error) {
    next(error);
  }
};

// Get stats of tasks
export const getTaskStats = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const total = await Task.countDocuments({ user: req.user?.id });
    const completed = await Task.countDocuments({ user: req.user?.id, status: "completed" });
    const pending = total - completed;

    res.json({ total, completed, pending });
  } catch (error) {
    next(error);
  }
};
