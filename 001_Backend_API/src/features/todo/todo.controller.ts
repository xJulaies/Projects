import { NextFunction, Request, Response } from "express";
import { taskModel, ITask } from "./todo.model";
import { createAnswer } from "../../lib/createAnswer";
import { createError } from "../../lib/createError";

export const GET_AllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { completed } = req.query as { completed: string | undefined };
    let filter: Partial<ITask> = {};

    if (completed !== undefined) {
      filter.completed = completed === "true";
    }

    const taskData: ITask[] = await taskModel.find(filter);

    res.status(200).json(createAnswer(200, "All task data", [taskData]));
  } catch (error) {
    next(createError(500, "Cannot load task data"));
  }
};

export const GET_Task = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const taskData = await taskModel.findById(id);

    if (!taskData) {
      return res.status(404).json(createAnswer(404, "Task not found", []));
    }
    res.status(200).json(createAnswer(200, "Task found", [taskData]));
  } catch (error) {
    next(createError(500, "failed to load Task"));
  }
};

export const POST_NewTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newTaskData = await taskModel.insertOne(req.body);

    res
      .status(201)
      .json(createAnswer(201, "New task successfully created", [newTaskData]));
  } catch (error) {
    next(createError(500, "cannot create Task"));
  }
};

export const PUT_UpdateTask = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedTask = await taskModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
        upsert: false,
      },
    );
    if (!updatedTask) {
      return res.status(404).json(createAnswer(404, "Task not found", []));
    }
    res
      .status(200)
      .json(createAnswer(200, "task successfully updated", [updatedTask]));
  } catch (error) {
    next(createError(500, "update failed"));
  }
};

export const DELETE_Task = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const deletedTask = await taskModel.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json(createAnswer(404, "Task not found", []));
    }
    res.status(200).json(createAnswer(200, "Task was deleted", [deletedTask]));
  } catch (error) {
    next(createError(500, "failed to delete"));
  }
};
