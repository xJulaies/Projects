import express, { json, NextFunction, Request, Response } from "express";
import { settings } from "./config/settings";
import jwt from "jsonwebtoken";
import { createAnswer } from "./lib/createAnswer";
import { createError, TCreateError } from "./lib/createError";
import { authRouter } from "./features/auth/authRoutes";

const app = express();

const BASE_URL = settings.BASE_URL;

app.use(json());
app.use((req, res, next) => {
  next();
});

app.use(`/${BASE_URL}`, authRouter);

const JWT_SECRET = settings.JWT_SECRET;

const userDB = {
  username: "admin",
  password: "secret123",
};

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    message: "API works",
  });
});

app.get("/public", (req: Request, res: Response) => {
  res.status(200).json({
    message: "public test route",
    test: true,
  });
});

app.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = userDB;

  if (username !== userDB.username || password !== userDB.password) {
    return res.status(401).json({
      status: 401,
      message: "authorization failed",
    });
  }

  if (!JWT_SECRET) {
    return res.status(500).json({
      message: "Server configuration error - missing secret",
    });
  }

  try {
    const accessToken = jwt.sign(
      {
        sub: "1",
        role: "admin",
      },
      JWT_SECRET,
      {
        algorithm: "HS256",
        expiresIn: "1h",
      },
    );
    return res.json({
      token: accessToken,
    });
  } catch (error) {
    return res.status(401).json({
      status: 401,
      message: "authorization failed",
    });
  }
});

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
