import { z } from "zod";

export const newBandSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  genre: z.string().trim().min(1, "Genre is required"),
  members: z.string().trim().min(1, "At least one member is required"),
  stage: z.enum(["Apollo North", "Grand X", "Side West"]),
  day: z.enum(["Friday", "Saturday", "Sunday"]),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  description: z.string().trim().min(1, "Description is required"),
  status: z.enum(["confirmed", "pending", "rejected", "cancelled"]),
});
