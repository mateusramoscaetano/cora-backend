import { Router } from "express";
import { errorHandler } from "../middlewares/error-handler";
import { upload } from "../lib/multer";
import { createReport } from "../controllers/report/create-report";
import { CreateReportParamsSchema } from "../zod-schemas/report/create-report-params.schema";
import { validateZodParams } from "../middlewares/validation-zod-params";
import { getReportUrl } from "../controllers/report/get-report-url";
import { idParamsSchema } from "../zod-schemas/id-schema";
import { deleteReport } from "../controllers/report/delete-report";
import { listReports } from "../controllers/report/list-reports";
import { listReportsByClinicController } from "../controllers/report/list-reeport-by-clinic-id";
import { listAllReportsController } from "../controllers/report/list-all-reports";
import { authLogin } from "../middlewares/auth-login";
import { listAllReportsByClientController } from "../controllers/report/list-all-reports-by-client";

const reportRoutes = Router();

reportRoutes.post(
  "/report/create/:petId/:clinicId",
  upload.single("file"),
  validateZodParams(CreateReportParamsSchema),
  createReport
);
reportRoutes.get("/reports/list-all", listAllReportsController);

reportRoutes.get(
  "/reports/list-by-client/:id",
  listAllReportsByClientController
);

reportRoutes.get(
  "/report/:id",
  validateZodParams(idParamsSchema),
  getReportUrl
);
reportRoutes.get(
  "/report/list/:id",
  validateZodParams(idParamsSchema),
  listReports
);

reportRoutes.get(
  "/report/list-by-clinic/:id",
  validateZodParams(idParamsSchema),
  listReportsByClinicController
);
reportRoutes.delete(
  "/report/:id",
  validateZodParams(idParamsSchema),
  deleteReport
);

reportRoutes.use(errorHandler);

export { reportRoutes };
