// import { RequestHandler } from "express";
// import { createAnswer } from "../../lib/createAnswer";
// import { createError } from "../../lib/createError";
// import { prisma } from "../../database";
// import { TuserIdParams } from "../../lib/types/types";

// export const GET_AllUsers: RequestHandler = async (_req, res, next) => {
//   try {
//     const users = await prisma.user.findMany();

//     res.status(200).json(createAnswer(200, "All user data", users));
//   } catch (error) {
//     next(createError(500, "Cannot load user data"));
//   }
// };

// export const GET_UsersById: RequestHandler<TuserIdParams> = async (
//   req,
//   res,
//   next,
// ) => {
//   try {
//     const { id } = req.params;

//     const user = await prisma.user.findUnique({
//       where: { id },
//     });

//     if (!user) {
//       return next(createError(404, "User not found"));
//     }

//     res.status(200).json(createAnswer(200, "User by ID", [user]));
//   } catch (error) {
//     next(createError(500, "Cannot load user data"));
//   }
// };

// export const POST_User: RequestHandler = async (req, res, next) => {};
