import { Router } from "express";
import { createDoctor } from "../controllers/doctor/create-doctor";
import { CreateDoctorRequestDtoSchema } from "../zod-schemas/doctor/create-doctor.schema";
import { validateZod } from "../middlewares/validation-zod";
import { errorHandler } from "../middlewares/error-handler";
import { loginDoctor } from "../controllers/doctor/login-doctor";
import { LoginDoctorRequestDtoSchema } from "../zod-schemas/doctor/login-doctor.schema";
import { listDoctors } from "../controllers/doctor/list-doctors";
import { getDoctor } from "../controllers/doctor/get-doctor";
import { validateZodParams } from "../middlewares/validation-zod-params";
import { idParamsSchema } from "../zod-schemas/id-schema";
import { updateDoctor } from "../controllers/doctor/update-doctor";
import { UpdateDoctorRequestDtoSchema } from "../zod-schemas/doctor/update-doctor.schema";
import { deleteDoctor } from "../controllers/doctor/delete-doctor";
import { getUserLogged } from "../controllers/doctor/get-user-logged";
import { authLogin } from "../middlewares/auth-login";
import { clinicDetailController } from "../controllers/clinic/clinic-detail";
import { getDoctorDetail } from "../controllers/doctor/doctor-detail";

const doctorRoutes = Router();

doctorRoutes.get(
  "/doctor/:id/detail",
  validateZodParams(idParamsSchema),
  getDoctorDetail
);

doctorRoutes.post(
  "/doctor/create",
  validateZod(CreateDoctorRequestDtoSchema),
  createDoctor
);
doctorRoutes.put(
  "/doctor/:id",
  validateZodParams(idParamsSchema),
  validateZod(UpdateDoctorRequestDtoSchema),
  updateDoctor
);

doctorRoutes.post(
  "/auth/login",
  validateZod(LoginDoctorRequestDtoSchema),
  loginDoctor
);
doctorRoutes.get("/doctor/list", listDoctors);
doctorRoutes.get("/doctor/:id", validateZodParams(idParamsSchema), getDoctor);

doctorRoutes.delete(
  "/doctor/:id",
  validateZodParams(idParamsSchema),
  deleteDoctor
);

doctorRoutes.get("/me", authLogin, getUserLogged);

doctorRoutes.use(errorHandler);

export { doctorRoutes };
