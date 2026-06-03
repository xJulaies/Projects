import express, { json, NextFunction, Request, Response } from "express";
import cors from "cors";
import { settings } from "./config/settings";

const app = express();

app.use(json());

app.listen(settings.PORT, () => {
  console.log(`Server Booted at Port ${settings.PORT}`);
});
