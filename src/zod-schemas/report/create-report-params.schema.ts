import { z } from "zod";

export const CreateReportParamsSchema = z.object({
  petId: z
    .string({ required_error: "Pet id is required" })
    .length(24, { message: "Pet id must be 24 characters long" }),
});
