import { z } from "zod";

export const CreatePetRequestDtoSchema = z.object({
  name: z.string().min(1, "Name must be at least 1 characters long").optional(),
  age: z
    .string()
    .min(1, "Password must be at least 5 characters long")
    .optional(),
});
