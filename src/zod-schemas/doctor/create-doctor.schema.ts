import { z } from "zod";

export const CreateDoctorRequestDtoSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Name must be at least 1 characters long"),
  password: z
    .string({ required_error: "Password is required" })
    .min(5, "Password must be at least 5 characters long"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Email with invalid format"),
  phone: z
    .string({ required_error: "Phone is required" })
    .min(10, "Phone must be at least 10 characters long"),
});
