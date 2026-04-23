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
  validatorHeaders(authorizationHeaderSchema),
  validatorBody(createPostBodySchema),
  requireUser,
  POST_post,
);
postRouter.patch(
  "/:postId",

  validatorParams(postIdParamsSchema),
  validatorHeaders(authorizationHeaderSchema),
  validatorBody(updatePostBodySchema),
  requireUser,
  PATCH_PostById,
);
postRouter.delete(
  "/:postId",
  validatorParams(postIdParamsSchema),
  validatorHeaders(authorizationHeaderSchema),
  requireUser,
  DELETE_PostById,
);

//public
postRouter.get("/", GET_AllPosts);
postRouter.get("/:postId", validatorParams(postIdParamsSchema), GET_PostById);
