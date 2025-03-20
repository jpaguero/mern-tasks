import { Router, Request, Response } from "express";
import authRoutes from "./authRoutes";
import taskRoutes from "./taskRoutes";
import iaRoutes from "./iaRoutes";

const router = Router();

// CHECK THE SWAGGER DOCUMENTATION IN http://localhost:5174/docs

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "API is working!!!!" });
});

router.use("/auth", authRoutes);
router.use("/tasks", taskRoutes);
router.use("/ia", iaRoutes);

export default router;