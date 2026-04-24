import { RequestHandler } from "express";
import { clerkClient, getAuth } from "@clerk/express";
import { prisma } from "../../database";
import { createAnswer } from "../../lib/createAnswer";
import { createError } from "../../lib/createError";
import { TCommentIdParams, TPostIdParams } from "../../lib/types/types";

export const POST_comment: RequestHandler<TPostIdParams> = async (
  req,
  res,
  next,
) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const { postId } = req.params;
    const { text } = req.body;

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return next(createError(404, "Post not found"));
    }

    const user = await clerkClient.users.getUser(userId);

    if (!user.username) {
      return next(createError(400, "Username is required"));
    }

    const comment = await prisma.comment.create({
      data: {
        text,
        postId,
        authorClerkId: userId,
        authorUsername: user.username,
      },
    });

    res.status(201).json(createAnswer(201, "Comment created", [comment]));
  } catch (error) {
    return next(createError(500, "Failed to create comment"));
  }
};

export const GET_commentByPostId: RequestHandler<TPostIdParams> = async (
  req,
  res,
  next,
) => {
  try {
    const { postId } = req.params;

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return next(createError(404, "Post not found"));
    }

    const comments = await prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: "asc" },
    });

    res.status(200).json(createAnswer(200, "Comments by post", comments));
  } catch (error) {
    next(createError(500, "Cannot load comments"));
  }
};

export const PATCH_commentById: RequestHandler<TCommentIdParams> = async (
  req,
  res,
  next,
) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const { commentId } = req.params;
    const { text } = req.body;

    const existingComment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!existingComment) {
      return next(createError(404, "Comment not found"));
    }

    if (existingComment.authorClerkId !== userId) {
      return next(createError(403, "Forbidden"));
    }

    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: { text },
    });

    res
      .status(200)
      .json(createAnswer(200, "Comment updated", [updatedComment]));
  } catch (error) {
    next(createError(500, "Failed to update comment"));
  }
};

export const DELETE_commentById: RequestHandler<TCommentIdParams> = async (
  req,
  res,
  next,
) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const { commentId } = req.params;

    const existingComment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!existingComment) {
      return next(createError(404, "Comment not found"));
    }

    if (existingComment.authorClerkId !== userId) {
      return next(createError(403, "Forbidden"));
    }

    const deletedComment = await prisma.comment.delete({
      where: { id: commentId },
    });

    res
      .status(200)
      .json(createAnswer(200, "Comment deleted", [deletedComment]));
  } catch (error) {
    next(createError(500, "Failed to delete comment"));
  }
};
