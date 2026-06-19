import { z } from "zod";

export const newBandSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required"),
    genre: z.string().trim().min(1, "Genre is required"),
    members: z
      .string()
      .refine(
        (value) => value.split(",").some((member) => member.trim().length > 0),
        "At least one member is required",
      ),
    stage: z.enum(["Apollo North", "Grand X", "Side West"]),
    day: z.enum(["Friday", "Saturday", "Sunday"]),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    description: z.string().trim().min(1, "Description is required"),
    status: z.enum(["confirmed", "pending", "rejected", "cancelled"]),
  })
  .refine(
    (data) => !data.startTime || !data.endTime || data.endTime > data.startTime,
    {
      message: "End time must be after start time",
      path: ["endTime"],
    },
  );
