import { z } from "zod";

export const authorizationHeaderSchema = z.object({
  authorization: z
    .string()
    .regex(/^Bearer\s.+$/, "Authorization header must use Bearer token"),
});
