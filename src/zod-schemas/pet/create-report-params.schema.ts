import { z } from "zod";

export const CreatePetParamsSchema = z.object({
  petOwnerId: z
    .string({ required_error: "Pet owner id is required" })
    .length(24, { message: "Pet owner id must be 24 characters long" }),
});
