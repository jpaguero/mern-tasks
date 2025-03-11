import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError";

const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  console.error(":::XXXX::: Error:", err.message);

  res.status(err.statusCode || 500).json({
    message: err.message || ":::XXXX::: Internal Server Error",
  });
};

export default errorHandler;
