import { config } from "dotenv";
import { MONGODB_ERROR_CODES } from "./../../node_modules/mongodb/src/error";

config();

export const settings = {
  PORT: process.env.PORT,
  BASE_URL: process.env.BASE_URL,
  MONGODB_URI: process.env.MONGODB_URI,
};
