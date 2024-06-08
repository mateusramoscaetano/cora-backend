import { Request, Response } from "express";
import tryCatch from "../../middlewares/try-catch";
import { listReportsByClinic } from "../../repositories/report";

export const listReportsByClinicController = tryCatch(
  async (request: Request, response: Response) => {
    const { id } = request.params as { id: string };
    const { page, searchTerm } = request.query as {
      page: string;
      searchTerm?: string;
    };

    const result = await listReportsByClinic(id, { page, searchTerm });
    response.status(201).json(result);
  }
);
