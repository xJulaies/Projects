import { RequestHandler } from "express";
import { prisma } from "../../database";
import { createAnswer } from "../../lib/createAnswer";
import { createError } from "../../lib/createError";
import { TUsernameParams } from "../../lib/types/types";

export const GET_PostsByUsername: RequestHandler<TUsernameParams> = async (
  req,
  res,
  next,
) => {
  try {
    const { username } = req.params;

    const posts = await prisma.post.findMany({
      where: { authorUsername: username },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(createAnswer(200, "Posts by username", posts));
  } catch (error) {
    next(createError(500, "Cannot load posts by username"));
  }
};

export const GET_CommentsByUsername: RequestHandler<TUsernameParams> = async (
  req,
  res,
  next,
) => {
  try {
    const { username } = req.params;

    const comments = await prisma.comment.findMany({
      where: { authorUsername: username },
      include: {
        post: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(createAnswer(200, "Comments by username", comments));
  } catch (error) {
    next(createError(500, "Cannot load comments by username"));
  }
};
