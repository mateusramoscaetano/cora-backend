import { Router } from "express";
import { createDoctor } from "../controllers/doctor/create-doctor";
import { CreateDoctorRequestDtoSchema } from "../zod-schemas/doctor/create-doctor.schema";
import { validateZod } from "../middlewares/validation-zod";
import { errorHandler } from "../middlewares/error-handler";
import { loginDoctor } from "../controllers/doctor/login-doctor";
import { LoginDoctorRequestDtoSchema } from "../zod-schemas/doctor/login-doctor.schema";
import { listDoctors } from "../controllers/doctor/list-doctors";
import { getDoctor } from "../controllers/doctor/geet-doctor";
import { validateZodParams } from "../middlewares/validation-zod-params";
import { idParamsSchema } from "../zod-schemas/id-schema";

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
doctorRoutes.get("/doctor/list", listDoctors);
doctorRoutes.get("/doctor/:id", validateZodParams(idParamsSchema), getDoctor);

doctorRoutes.use(errorHandler);

export { doctorRoutes };
