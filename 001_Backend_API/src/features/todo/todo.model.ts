import { Schema, model } from "mongoose";

export interface ITask {
  title: string;
  description: string;
  completed: boolean;
  created: Date;
}

const taskSchema = new Schema<ITask>({
  title: {
    type: String,
    required: true,
  },
  description: String,
  completed: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export const taskModel = model<ITask>("Task", taskSchema, "todo");
