import express, { json, NextFunction, Request, Response } from "express";
import { settings } from "./config/settings";
import { createAnswer } from "./lib/createAnswer";
import { createError, TCreateError } from "./lib/createError";
import { postRouter } from "./features/posts/posts.routes";
import { clerkMiddleware } from "@clerk/express";

const app = express();
const BASE_URL = settings.BASE_URL;

app.use(json());
app.use(clerkMiddleware());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    message: "API works",
  });
});

app.use(`${BASE_URL}/posts`, postRouter);

app.use((req, res, next) => {
  return next(createError(404, "Not here, not found"));
});

app.use(
  (err: TCreateError, req: Request, res: Response, next: NextFunction) => {
    return res
      .status(err.status || 500)
      .json(createAnswer(err.status || 500, err.message || "Server Error", []));
  },
);

app.listen(settings.PORT, () => {
  console.log(`Server boot success! Port: ${settings.PORT}`);
});
