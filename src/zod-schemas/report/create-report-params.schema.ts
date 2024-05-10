import { z } from "zod";

export const CreateReportParamsSchema = z.object({
  clinicId: z
    .string({ required_error: "Client id is required" })
    .length(24, { message: "Client id must be 24 characters long" }),
  petId: z
    .string({ required_error: "Pet id is required" })
    .length(24, { message: "Pet id must be 24 characters long" }),
  petOwnerId: z
    .string({ required_error: "Pet owner id is required" })
    .length(24, { message: "Pet owner id must be 24 characters long" }),
});
