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
import { getClinic } from "../controllers/clinic/get-clinic";
import { loginClinic } from "../controllers/clinic/login-clinic";
import { LoginClinicRequestDtoSchema } from "../zod-schemas/clinic/login-clinic.schema";
import { deleteClinic } from "../controllers/clinic/delete-clinic";
import { clinicDetail } from "../repositories/clinic";
import { clinicDetailController } from "../controllers/clinic/clinic-detail";

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

clinicRoutes.get("/clinic/:id", validateZodParams(idParamsSchema), getClinic);

clinicRoutes.get(
  "/clinic/:id/detail",
  validateZodParams(idParamsSchema),
  clinicDetailController
);

clinicRoutes.post(
  "/clinic/login",
  validateZod(LoginClinicRequestDtoSchema),
  loginClinic
);

clinicRoutes.delete(
  "/clinic/:id",
  validateZodParams(idParamsSchema),
  deleteClinic
);

clinicRoutes.use(errorHandler);

export { clinicRoutes };
