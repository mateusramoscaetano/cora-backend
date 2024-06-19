import { Request, Response } from "express";
import tryCatch from "../../middlewares/try-catch";
import { CreateReportService } from "../../services/report/create-report";

export const createReport = tryCatch(
  async (request: Request, response: Response) => {
    const { petId, clinicId } = request.params as {
      clinicId: string;
      petId: string;
    };
    const { id: doctorId } = request.user;

    const { originalname, mimetype, buffer } =
      request.file as Express.Multer.File;

    const createReportInstance = new CreateReportService();
    const createReport = await createReportInstance.createReportService({
      path: originalname,
      petId,
      mimeType: mimetype,
      buffer,
      clinicId,
      doctorId,
    });
    response.status(201).json(createReport);
  }
);
