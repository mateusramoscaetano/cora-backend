import { Router } from "express";
import { errorHandler } from "../middlewares/error-handler";
import { createClinic } from "../controllers/clinic/create-clinic";
import { validateZod } from "../middlewares/validation-zod";
import { CreateClinicRequestDtoSchema } from "../zod-schemas/clinic/create-clinic.schema";

const clinicRoutes = Router();

clinicRoutes.post(
  "/clinic/create",
  validateZod(CreateClinicRequestDtoSchema),
  createClinic
);

clinicRoutes.use(errorHandler);

export { clinicRoutes };
