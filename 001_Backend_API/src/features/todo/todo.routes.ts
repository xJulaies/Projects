import { Router } from "express";
import {
  GET_AllTasks,
  GET_Task,
  POST_NewTask,
  PUT_UpdateTask,
  DELETE_Task,
} from "./todo.controller";

export const taskRouter = Router();

taskRouter.get("/tasks", GET_AllTasks);
taskRouter.get("/tasks/:id", GET_Task);
taskRouter.post("/tasks", POST_NewTask);
taskRouter.put("/tasks/:id", PUT_UpdateTask);
taskRouter.delete("/tasks/:id", DELETE_Task);
