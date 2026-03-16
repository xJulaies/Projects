import express, { json, NextFunction, Request, Response } from "express";
import { settings } from "./config/settings";
import { userRouter } from "./features/users/users.routes";
import { createAnswer } from "./lib/createAnswer";
import { createError, TCreateError } from "./lib/createError";
import connectDB from "./config/database.config";

connectDB();

const app = express();

app.use(json());
app.use((req, res, next) => {
  next();
});

app.use("/api", userRouter);

app.use((req, res, next) => {
  next(createError(404, "Not here, not found"));
});

app.use(
  (err: TCreateError, req: Request, res: Response, next: NextFunction) => {
    res
      .status(err.status || 500)
      .json(createAnswer(err.status || 500, err.message || "Server Error", []));
  },
);

app.listen(settings.PORT, () => {
  console.log("Server boot success! Port: 3000");
});
