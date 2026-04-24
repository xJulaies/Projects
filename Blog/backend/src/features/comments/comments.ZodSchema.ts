import { z } from "zod";

export const createCommentBodySchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, "Text is required")
    .max(2000, "Text must not exceed 2000 characters"),
});

export const commentIdParamsSchema = z.object({
  commentId: z.string().min(1, "Comment id is required"),
});

export const updateCommentBodySchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, "Text is required")
    .max(2000, "Text must not exceed 2000 characters"),
});
