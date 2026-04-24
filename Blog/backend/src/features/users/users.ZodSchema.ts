import { z } from "zod";

export const usernameParamsSchema = z.object({
  username: z.string().min(1, "Username is required"),
});
