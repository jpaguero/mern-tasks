import { NextFunction, Request, Response } from "express";
import User, { UserRole } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../utils/apiError";

const JWT_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

// Generate access token
const generateAccessToken = (user: any) => {
    return jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "15m" });
  };
  
// Generate Refresh Token
const generateRefreshToken = (user: any) => {
return jwt.sign({ id: user._id }, REFRESH_SECRET, { expiresIn: "7d" });
};

// Register
export const register = async (req: Request, res: Response, next: any): Promise<void> => {
  try {
    const { nickname, password, role } = req.body;

    if (!nickname || !password) {
      throw new ApiError("Nickname and password are required", 400);
    }

    const existingUser = await User.findOne({ nickname });
    if (existingUser) {
        throw new ApiError("Nickname already taken", 400);
    }

    const validRoles: UserRole[] = ["user", "admin"];
    if (role && !validRoles.includes(role)) {
      throw new ApiError("Invalid role", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ nickname, password: hashedPassword, role: role || "user" });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

// Login
export const login = async (req: Request, res: Response, next: any): Promise<void> => {
  try {
    const { nickname, password } = req.body;

    if (!nickname || !password) {
        throw new ApiError("Nickname and password are required", 400);
    }

    // Find user in DB
    const user = await User.findOne({ nickname });
    if (!user) {
        throw new ApiError("Invalid credentials", 401);
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new ApiError("Invalid credentials", 401);
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Save Refresh Token in BD
    user.refreshToken = refreshToken;
    await user.save();

    res.json({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        throw new ApiError("Refresh Token is required", 400);
      }
  
      const user = await User.findOne({ refreshToken });
      if (!user) {
        throw new ApiError("Invalid Refresh Token", 403);
      }
  
      jwt.verify(refreshToken, REFRESH_SECRET, (err: any, decoded: any) => {
        if (err || user.id.toString() !== decoded.id) {
          throw new ApiError("Invalid Refresh Token", 403);
        }
  
        const newAccessToken = generateAccessToken(user);
        res.json({ accessToken: newAccessToken });
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        throw new ApiError("Refresh Token is required", 400);
      }
  
      const user = await User.findOne({ refreshToken });
      if (!user) {
        throw new ApiError("Invalid Refresh Token", 403);
      }
  
      user.refreshToken = null;
      await user.save();
  
      res.json({ message: "Logout successful" });
    } catch (error) {
      next(error);
    }
  };
  