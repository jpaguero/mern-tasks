import { Request, Response } from "express";
import User, { UserRole } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../utils/apiError";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

// Register
export const register = async (req: Request, res: Response, next: any): Promise<void> => {
  try {
    const { nickname, password, role } = req.body;

    // validate input data
    if (!nickname || !password) {
      throw new ApiError("Nickname and password are required", 400);
    }

    // Validate if user exist
    const existingUser = await User.findOne({ nickname });
    if (existingUser) {
        throw new ApiError("Nickname already taken", 400);
    }

    //Validate Role
    const validRoles: UserRole[] = ["user", "admin"];
    if (role && !validRoles.includes(role)) {
      throw new ApiError("Invalid role", 400);
    }

    // Encript pasword
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
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

    // Create JWT token with id and role
    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
      );

    res.json({ token });
  } catch (error) {
    next(error);
  }
};
