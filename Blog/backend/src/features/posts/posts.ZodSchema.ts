import { z } from "zod";

export const createPostBodySchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(120, "Title must not exceed 120 characters"),
  content: z
    .string()
    .trim()
    .min(1, "Content is required")
    .max(10_000, "Content must not exceed 10000 characters"),
});

export const postIdParamsSchema = z.object({
  postId: z.string().min(1, "Post id is required"),
});

export const updatePostBodySchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Title is required")
      .max(120, "Title must not exceed 120 characters")
      .optional(),
    content: z
      .string()
      .trim()
      .min(1, "Content is required")
      .max(10_000, "Content must not exceed 10000 characters")
      .optional(),
  })
  .refine((data) => data.title !== undefined || data.content !== undefined, {
    message: "At least title or content must be provided",
  });
