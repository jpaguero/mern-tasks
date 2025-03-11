import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import ApiError from "../utils/apiError";

// Validate JWT_SECRET to avoid silent errors
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables.");
}

export interface AuthRequest extends Request {
  user?: {id: string, role: "user" | "admin"}
}

// Helper function to validate and decode JWT
const validateToken = (token: string): string | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if (!decoded.id) {
        throw new Error("Invalid token: missing user ID");
    }
    return decoded.id;
  } catch (error) {
    return null;
  }
};

// Middleware to verify JWT authentication
export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.header("Authorization");
  
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new ApiError("Access denied. Invalid token format.", 401));
    }
  
    const token = authHeader.split(" ")[1];
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
  
      if (!decoded.id || !decoded.role) {
        return next(new ApiError("Invalid token payload", 403));
      }
  
      req.user = { id: decoded.id, role: decoded.role as "user" | "admin" };
      next();
    } catch (error) {
      return next(new ApiError("Invalid or expired token.", 403));
    }
  };