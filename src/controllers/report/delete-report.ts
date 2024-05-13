import { Request, Response } from "express";
import tryCatch from "../../middlewares/try-catch";
import { DeleteReportService } from "../../services/report/delete-report";

export const deleteReport = tryCatch(
  async (request: Request, response: Response) => {
    const { id } = request.params as { id: string };
    const deleteReportInstance = new DeleteReportService();

    const deleteReport = await deleteReportInstance.deleteReportService(id);
    response.status(200).json(deleteReport);
  }
);
