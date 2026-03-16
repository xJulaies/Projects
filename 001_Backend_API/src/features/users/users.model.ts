import { Schema, model } from "mongoose";

export interface IUser {
  name: string;
  age: number;
  password: string;
  email: string;
  created: Date;
}

const userSchema = new Schema<IUser>({
  name: String,
  age: Number,
  password: {
    type: String,
    minLength: [8, "must have at least 8 characters"],
    trim: true,
  },
  email: {
    type: String,
    lowercase: true,
    index: true,
    unique: [true, "User cannot be created"],
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export const UserModel = model<IUser>("User", userSchema, "user");
