import { Request, Response } from "express";
import tryCatch from "../../middlewares/try-catch";
import { GetReportUrlService } from "../../services/report/get-report-url";

export const getReportUrl = tryCatch(
  async (request: Request, response: Response) => {
    const { id } = request.params as { id: string };

    const getReportUrlInstance = new GetReportUrlService();
    const getReportUrl = await getReportUrlInstance.getReportUrlService(id);
    response.status(201).json(getReportUrl);
  }
);
