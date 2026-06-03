import { config } from "dotenv";

config();

export const settings = {
  PORT: process.env.PORT,
};
