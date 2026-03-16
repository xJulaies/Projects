import { NextFunction, Request, Response } from "express";
import { UserModel, IUser } from "./users.model";
import { createAnswer } from "../../lib/createAnswer";
import { createError } from "../../lib/createError";

export const GET_AllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userData: IUser[] = await UserModel.find();

    res.status(200).json(createAnswer(200, "All user data", [userData]));
  } catch (error) {
    next(createError(500, "Cannot load user data"));
  }
};

export const GET_User = async (
  req: Request<{ email: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.params;
    const userData = await UserModel.findOne({ email });

    if (!userData) {
      return res.status(404).json(createAnswer(404, "user not found", []));
    }
    res.status(200).json(createAnswer(200, "user found", [userData]));
  } catch (error) {
    next(createError(500, "failed to load user"));
  }
};

export const POST_NewUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newUserData = await UserModel.insertOne(req.body);

    res
      .status(201)
      .json(createAnswer(201, "New user successfully created", [newUserData]));
  } catch (error) {
    next(createError(500, "cannot create User"));
  }
};

export const PUT_UpdateUser = async (
  req: Request<{ email: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.params;
    const updateData = req.body;

    const updatedUser = await UserModel.findOneAndUpdate(
      { email },
      { $set: updateData },
      {
        new: true,
        runValidators: true,
        upsert: false,
      },
    );
    if (!updatedUser) {
      return res.status(404).json(createAnswer(404, "User not found", []));
    }
    res
      .status(200)
      .json(createAnswer(200, "User successfully updated", [updatedUser]));
  } catch (error) {
    next(createError(500, "update failed"));
  }
};

export const DELETE_User = async (
  req: Request<{ email: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.params;
    const deletedUser = await UserModel.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).json(createAnswer(404, "User not found", []));
    }
    res.status(200).json(createAnswer(200, "User was deleted", [deletedUser]));
  } catch (error) {
    next(createError(500, "failed to delete"));
  }
};
