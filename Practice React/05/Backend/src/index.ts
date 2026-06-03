import express, { json, NextFunction, Request, Response } from "express";
import cors from "cors";
import { settings } from "./config/settings";
import { createError } from "./lib/handleError/createError";
import { createAnswer } from "./lib/handleError/createAnswer";
import type { TCreateError } from "./types/errorTypes";

const app = express();

app.use(json());

app.use((_req: Request, _res: Response, next: NextFunction) => {
  return next(createError(404, "Not found"));
});

app.use(
  (err: TCreateError, req: Request, res: Response, next: NextFunction) => {
    return res
      .status(err.status || 500)
      .json(createAnswer(err.status || 500, err.message || "Server Error", []));
  },
);

app.listen(settings.PORT, () => {
  console.log(`Server Booted at Port ${settings.PORT}`);
});
