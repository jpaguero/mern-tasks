import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError";
import { AuthRequest } from "./authMiddleware";

export const checkRole = (requiredRole: "admin" | "user") => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
        return next(new ApiError("Unauthorized", 401));
    }

    if (req.user.role !== requiredRole) {
        return next(new ApiError("Forbidden: You do not have access to this resource", 403));
    }

    next();
  };
};
