import { Request, Response } from "express";
import tryCatch from "../../middlewares/try-catch";
import {
  IListAllReportsOptions,
  listAllReports,
} from "../../repositories/report";

export const listAllReportsController = tryCatch(
  async (request: Request, response: Response) => {
    const { page, searchTerm } = request.query as {
      page: string;
      searchTerm?: string;
    };

    const result = await listAllReports({ page, searchTerm });
    response.status(201).json(result);
  }
);
