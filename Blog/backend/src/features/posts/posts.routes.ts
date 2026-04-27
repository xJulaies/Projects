import { Router } from "express";
import {
  POST_post,
  GET_AllPosts,
  GET_PostById,
  PATCH_PostById,
  DELETE_PostById,
} from "./posts.controller";
import { requireUser } from "../../middlewares/clerk";
import {
  validatorBody,
  validatorHeaders,
  validatorParams,
} from "../../middlewares/validate";
import { authorizationHeaderSchema } from "../../lib/schemas/requestSchemas";
import {
  createPostBodySchema,
  postIdParamsSchema,
  updatePostBodySchema,
} from "./posts.ZodSchema";

export const postRouter = Router();

//protected

postRouter.post(
  "/",
  requireUser,
  validatorHeaders(authorizationHeaderSchema),
  validatorBody(createPostBodySchema),
  POST_post,
);
postRouter.patch(
  "/:postId",

  requireUser,
  validatorParams(postIdParamsSchema),
  validatorHeaders(authorizationHeaderSchema),
  validatorBody(updatePostBodySchema),
  PATCH_PostById,
);
postRouter.delete(
  "/:postId",
  requireUser,
  validatorParams(postIdParamsSchema),
  validatorHeaders(authorizationHeaderSchema),
  DELETE_PostById,
);

//public
postRouter.get("/", GET_AllPosts);
postRouter.get("/:postId", validatorParams(postIdParamsSchema), GET_PostById);
