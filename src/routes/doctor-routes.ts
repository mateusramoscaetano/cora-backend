import { Router } from "express";
import { createDoctor } from "../controllers/doctor/create-doctor";
import { CreateDoctorRequestDtoSchema } from "../zod-schemas/doctor/create-doctor.schema";
import { validateZod } from "../middlewares/validation-zod";
import { errorHandler } from "../middlewares/error-handler";
import { loginDoctor } from "../controllers/doctor/login-doctor";
import { LoginDoctorRequestDtoSchema } from "../zod-schemas/doctor/login-doctor.schema";

const doctorRoutes = Router();

doctorRoutes.post(
  "/doctor/create",
  validateZod(CreateDoctorRequestDtoSchema),
  createDoctor
);
doctorRoutes.post(
  "/doctor/login",
  validateZod(LoginDoctorRequestDtoSchema),
  loginDoctor
);

doctorRoutes.use(errorHandler);

export { doctorRoutes };
