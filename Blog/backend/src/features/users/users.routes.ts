// import { Router } from "express";
// import { GET_AllUsers, GET_UsersById } from "./users.controller";
// import { validatorParams } from "../../middlewares/validate";
// import { userIdParamsSchema } from "./users.ZodSchema";
// import { getAuth } from "@clerk/express";

// export const userRouter = Router();

// userRouter.get("/users", GET_AllUsers);
// userRouter.get(
//   "/users/:id",
//   validatorParams(userIdParamsSchema),
//   GET_UsersById,
// );

// userRouter.get("/test", (req, res) => {
//   res.json({
//     baseUrl: req.baseUrl,
//     path: req.path,
//     originalUrl: req.originalUrl,
//   });
// });

// userRouter.get("/protected", (req, res) => {
//   const { userId } = getAuth(req);

//   if (!userId) {
//     return res.status(401).json({
//       message: "Unauthorized",
//     });
//   }

//   return res.status(200).json({
//     message: "Protected route works",
//     userId,
//   });
// });
