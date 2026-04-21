import express, { json, NextFunction, Request, Response } from "express";
import { settings } from "./config/settings";
import { createAnswer } from "./lib/createAnswer";
import { createError, TCreateError } from "./lib/createError";

const app = express();
app.use(json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    message: "API works",
  });
});

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
