import { Router } from "express";
import {
  GET_CommentsByUsername,
  GET_PostsByUsername,
} from "./users.controller";
import { validatorParams } from "../../middlewares/validate";
import { usernameParamsSchema } from "./users.ZodSchema";

export const userRouter = Router();

userRouter.get(
  "/:username/posts",
  validatorParams(usernameParamsSchema),
  GET_PostsByUsername,
);

userRouter.get(
  "/:username/comments",
  validatorParams(usernameParamsSchema),
  GET_CommentsByUsername,
);
