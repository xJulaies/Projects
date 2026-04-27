import { Router } from "express";
import {
  POST_comment,
  GET_commentByPostId,
  PATCH_commentById,
  DELETE_commentById,
} from "./comments.controller";
import {
  validatorBody,
  validatorHeaders,
  validatorParams,
} from "../../middlewares/validate";
import { authorizationHeaderSchema } from "../../lib/schemas/requestSchemas";
import {
  createCommentBodySchema,
  updateCommentBodySchema,
} from "./comments.ZodSchema";
import { requireUser } from "../../middlewares/clerk";
import { commentIdParamsSchema } from "./comments.ZodSchema";
import { postIdParamsSchema } from "../posts/posts.ZodSchema";

export const commentRouter = Router();

//protected

commentRouter.post(
  "/posts/:postId/comments",
  requireUser,
  validatorParams(postIdParamsSchema),
  validatorHeaders(authorizationHeaderSchema),
  validatorBody(createCommentBodySchema),
  POST_comment,
);

commentRouter.patch(
  "/comments/:commentId",
  requireUser,
  validatorParams(commentIdParamsSchema),
  validatorHeaders(authorizationHeaderSchema),
  validatorBody(updateCommentBodySchema),
  PATCH_commentById,
);

commentRouter.delete(
  "/comments/:commentId",
  requireUser,
  validatorParams(commentIdParamsSchema),
  validatorHeaders(authorizationHeaderSchema),
  DELETE_commentById,
);

//public
commentRouter.get(
  "/posts/:postId/comments",
  validatorParams(postIdParamsSchema),
  GET_commentByPostId,
);
