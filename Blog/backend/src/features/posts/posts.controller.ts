import { RequestHandler } from "express";
import { clerkClient, getAuth } from "@clerk/express";
import { prisma } from "../../database";
import { createAnswer } from "../../lib/createAnswer";
import { createError } from "../../lib/createError";
import { TPostIdParams } from "../../lib/types/types";

export const POST_post: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const { title, content } = req.body;
    const user = await clerkClient.users.getUser(userId);

    if (!user.username) {
      return next(createError(400, "Username is required"));
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorClerkId: userId,
        authorUsername: user.username,
      },
    });

    res.status(201).json(createAnswer(201, "Post created", [post]));
  } catch (error) {
    return next(createError(500, "Failed to create post"));
  }
};

export const GET_AllPosts: RequestHandler = async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany();

    res.status(200).json(createAnswer(200, "All posts data", posts));
  } catch (error) {
    next(createError(500, "Cannot load post data"));
  }
};

export const GET_PostById: RequestHandler<TPostIdParams> = async (
  req,
  res,
  next,
) => {
  try {
    const { postId } = req.params;
    const post = await prisma.post.findUnique({ where: { id: postId } });

    if (!post) {
      return next(createError(404, "Post not found"));
    }

    res.status(200).json(createAnswer(200, "Post data by ID", [post]));
  } catch (error) {
    next(createError(500, "Cannot load post data"));
  }
};

export const PATCH_PostById: RequestHandler<TPostIdParams> = async (
  req,
  res,
  next,
) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }

    const { postId } = req.params;
    const { title, content } = req.body;
    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!existingPost) {
      return next(createError(404, "Post not found"));
    }

    if (existingPost.authorClerkId !== userId) {
      return next(createError(403, "Forbidden"));
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        ...(title !== undefined && { title }),
        ...(content !== undefined && { content }),
      },
    });
    res.status(200).json(createAnswer(200, "Post updated", [updatedPost]));
  } catch (error) {
    next(createError(500, "Failed to update post"));
  }
};

export const DELETE_PostById: RequestHandler<TPostIdParams> = async (
  req,
  res,
  next,
) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }

    const { postId } = req.params;

    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!existingPost) {
      return next(createError(404, "Post not found"));
    }

    if (existingPost.authorClerkId !== userId) {
      return next(createError(403, "Forbidden"));
    }

    const deletedPost = await prisma.post.delete({
      where: { id: postId },
    });
    res.status(200).json(createAnswer(200, "Post deleted", [deletedPost]));
  } catch (error) {
    next(createError(500, "Failed to delete post"));
  }
};
