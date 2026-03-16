import { TStatusCode } from "./types";

export const createAnswer = (
  status: TStatusCode,
  message: string,
  data: any[],
) => {
  return { status, message, data };
};
