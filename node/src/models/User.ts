import mongoose, { Schema, Document } from "mongoose";

// Define allowed roles
export type UserRole = "user" | "admin";

export interface IUser extends Document {
  nickname: string;
  password: string;
  role: UserRole;
  refreshToken?: string | null;
}

const UserSchema = new Schema<IUser>(
  {
    nickname: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    refreshToken: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
