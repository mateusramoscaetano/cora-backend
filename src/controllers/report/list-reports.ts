import { Request, Response } from "express";
import tryCatch from "../../middlewares/try-catch";
import { ListReportsService } from "../../services/report/list-reports";

export const listReports = tryCatch(
  async (request: Request, response: Response) => {
    const { id } = request.params as { id: string };

    const listReportsInstance = new ListReportsService();

    const listReports = await listReportsInstance.listReportsService(id);
    response.status(200).json(listReports);
  }
);
