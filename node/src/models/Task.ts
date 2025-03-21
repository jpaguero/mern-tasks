import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  status: "pending" | "completed";
  user: mongoose.Types.ObjectId;
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    status: { type: String, enum: ["pending", "completed"], default: "pending" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", TaskSchema);
