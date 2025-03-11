import express, { Application } from "express";
import cors from "cors";
import { PORT } from "./config/env";
import connectDB from "./config/db";
import router from "./routes";
import errorHandler from "./middlewares/errorHandler";

// MongoDB conection
connectDB();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/", router);

// Middleware to handle errors
app.use(errorHandler);

// Start Server
const server = app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

export { app, server };
