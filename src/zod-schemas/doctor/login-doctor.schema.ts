import { z } from "zod";

export const LoginDoctorRequestDtoSchema = z.object({
  password: z.string({ required_error: "Password is required" }),

  email: z
    .string({ required_error: "Email is required" })
    .email("Email with invalid format"),
});
