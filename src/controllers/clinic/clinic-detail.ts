import { Request, Response } from "express";
import tryCatch from "../../middlewares/try-catch";
import { clinicDetail } from "../../repositories/clinic";

export const clinicDetailController = tryCatch(
  async (request: Request, response: Response) => {
    const { id } = request.params as { id: string };

    const clinicDetailController = await clinicDetail(id);
    response.status(201).json(clinicDetailController);
  }
);
