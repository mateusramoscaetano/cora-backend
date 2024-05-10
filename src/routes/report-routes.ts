import { Router } from "express";
import { errorHandler } from "../middlewares/error-handler";
import { upload } from "../lib/multer";
import { createReport } from "../controllers/report/create-report";

const reportRoutes = Router();

reportRoutes.post(
  "/report/create/:clinicId/:petId/:petOwnerId",
  upload.single("file"),
  createReport
);

reportRoutes.use(errorHandler);

export { reportRoutes };
