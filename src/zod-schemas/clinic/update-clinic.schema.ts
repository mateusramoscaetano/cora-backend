import { z } from "zod";

export const UpdateClinicRequestDtoSchema = z.object({
  name: z.string().min(3, "Name must be at least 1 characters long").optional(),
  password: z
    .string()
    .min(5, "Password must be at least 5 characters long")
    .optional(),
  email: z.string().email("Email with invalid format").optional(),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 characters long")
    .optional(),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters long")
    .optional(),
});
