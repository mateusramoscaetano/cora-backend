import { Request, Response } from "express";
import tryCatch from "../../middlewares/try-catch";
import { CreateReportService } from "../../services/report/create-report";

export const createReport = tryCatch(
  async (request: Request, response: Response) => {
    const { clinicId, petId, petOwnerId } = request.params as {
      clinicId: string;
      petId: string;
      petOwnerId: string;
    };

    const { originalname, mimetype, buffer } =
      request.file as Express.Multer.File;

    const createReportInstance = new CreateReportService();
    const createReport = await createReportInstance.createReportService({
      clinicId,
      path: originalname,
      petId,
      petOwnerId,
      mimeType: mimetype,
      buffer,
    });
    response.status(201).json(createReport);
  }
);
