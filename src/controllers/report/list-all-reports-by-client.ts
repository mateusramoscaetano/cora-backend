import { Request, Response } from "express";
import tryCatch from "../../middlewares/try-catch";
import { listAllReportsByClient } from "../../repositories/report";

export const listAllReportsByClientController = tryCatch(
  async (request: Request, response: Response) => {
    const { page } = request.query as {
      page: string;
    };
    const { id } = request.params as { id: string };

    const result = await listAllReportsByClient(id);
    response.status(201).json(result);
  }
);
