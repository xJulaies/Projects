import express, { json, NextFunction, Request, Response } from "express";
import cors from "cors";
import { settings } from "./config/settings";
import { createError } from "./lib/handleError/createError";
import { createAnswer } from "./lib/handleError/createAnswer";
import { connectMongoDB } from "./db";
import { cardsRouter } from "./features/cards/cards.routes";
import type { TCreateError } from "./types/error.types";

const BASE_URL = settings.BASE_URL;
const PORT = settings.PORT;

const app = express();

app.use(json());

app.use(`${BASE_URL}/cards`, cardsRouter);

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

async function startServer() {
  try {
    await connectMongoDB();
    app.listen(PORT, () => {
      console.log(`Server Booted at Port ${PORT}`);
    });
  } catch (error) {
    console.log("Server boot failed", error);
    process.exit(1);
  }
}

startServer();
