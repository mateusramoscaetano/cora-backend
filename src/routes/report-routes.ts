import { Router } from "express";
import { errorHandler } from "../middlewares/error-handler";
import { upload } from "../lib/multer";
import { createReport } from "../controllers/report/create-report";
import { CreateReportParamsSchema } from "../zod-schemas/report/create-report-params.schema";
import { validateZodParams } from "../middlewares/validation-zod-params";

const reportRoutes = Router();

reportRoutes.post(
  "/report/create/:clinicId/:petId/:petOwnerId",
  upload.single("file"),
  validateZodParams(CreateReportParamsSchema),
  createReport
);

reportRoutes.use(errorHandler);

export { reportRoutes };
