import { z } from "zod";

export const CreatePetRequestDtoSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Name must be at least 1 characters long"),
  age: z
    .string({ required_error: "Password is required" })
    .min(1, "Password must be at least 5 characters long"),
});
