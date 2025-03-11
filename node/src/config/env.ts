import dotenv from "dotenv";

dotenv.config();

const REQUIRED_ENV_VARS = ["PORT", "MONGO_URI"];

//Check if all variables are defined to avoid errors
REQUIRED_ENV_VARS.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing environment variable: ${envVar}`);
  }
});

export const PORT = process.env.PORT || 5174;
export const MONGO_URI = process.env.MONGO_URI!;
