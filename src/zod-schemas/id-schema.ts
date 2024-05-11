import { z } from "zod";

export const idParamsSchema = z.object({
  id: z
    .string({ required_error: "id is required" })
    .length(24, { message: "id must be 24 characters long" }),
});
