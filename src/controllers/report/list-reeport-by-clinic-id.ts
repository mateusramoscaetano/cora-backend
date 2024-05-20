import { Request, Response } from "express";
import tryCatch from "../../middlewares/try-catch";
import { listReportsByClinic } from "../../repositories/report";

export const listReportsByClinicController = tryCatch(
  async (request: Request, response: Response) => {
    const { id } = request.params as { id: string };

    const result = await listReportsByClinic(id);
    response.status(201).json(result);
  }
);
