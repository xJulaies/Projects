import { Router } from "express";
import {
  GET_AllUsers,
  GET_User,
  POST_NewUser,
  PUT_UpdateUser,
  DELETE_User,
} from "./users.controller";

export const userRouter = Router();

userRouter.get("/users", GET_AllUsers);
userRouter.get("/users/:email", GET_User);
userRouter.post("/users", POST_NewUser);
userRouter.put("/users/:email", PUT_UpdateUser);
userRouter.delete("/users/:email", DELETE_User);
