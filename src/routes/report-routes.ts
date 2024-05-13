import { Router } from "express";
import { errorHandler } from "../middlewares/error-handler";
import { upload } from "../lib/multer";
import { createReport } from "../controllers/report/create-report";
import { CreateReportParamsSchema } from "../zod-schemas/report/create-report-params.schema";
import { validateZodParams } from "../middlewares/validation-zod-params";
import { getReportUrl } from "../controllers/report/get-report-url";
import { idParamsSchema } from "../zod-schemas/id-schema";
import { deleteReport } from "../controllers/report/delete-report";

const reportRoutes = Router();

reportRoutes.post(
  "/report/create/:petId",
  upload.single("file"),
  validateZodParams(CreateReportParamsSchema),
  createReport
);
reportRoutes.get(
  "/report/:id",
  validateZodParams(idParamsSchema),
  getReportUrl
);
reportRoutes.delete(
  "/report/:id",
  validateZodParams(idParamsSchema),
  deleteReport
);

reportRoutes.use(errorHandler);

export { reportRoutes };
