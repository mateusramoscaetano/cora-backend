import { Router } from "express";
import { errorHandler } from "../middlewares/error-handler";
import { createClinic } from "../controllers/clinic/create-clinic";
import { validateZod } from "../middlewares/validation-zod";
import { CreateClinicRequestDtoSchema } from "../zod-schemas/clinic/create-clinic.schema";
import { listClinics } from "../controllers/clinic/list-clinics";
import { validateZodParams } from "../middlewares/validation-zod-params";
import { idParamsSchema } from "../zod-schemas/id-schema";
import { updateClinic } from "../controllers/clinic/update-clinic";
import { UpdateClinicRequestDtoSchema } from "../zod-schemas/clinic/update-clinic.schema";

const clinicRoutes = Router();

clinicRoutes.post(
  "/clinic/create",
  validateZod(CreateClinicRequestDtoSchema),
  createClinic
);

clinicRoutes.put(
  "/clinic/:id",
  validateZodParams(idParamsSchema),
  validateZod(UpdateClinicRequestDtoSchema),
  updateClinic
);
clinicRoutes.get("/clinic/list", listClinics);

clinicRoutes.use(errorHandler);

export { clinicRoutes };
