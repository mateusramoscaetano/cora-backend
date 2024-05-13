import { Request, Response } from "express";
import tryCatch from "../../middlewares/try-catch";
import { ListDoctorsService } from "../../services/doctor/list-doctors";

export const listDoctors = tryCatch(
  async (request: Request, response: Response) => {
    const { page, name } = request.query as { page: string; name?: string };
    const listDoctorsInstance = new ListDoctorsService();
    const listDoctors = await listDoctorsInstance.listDoctorsService(
      page,
      name
    );
    response.status(200).json(listDoctors);
  }
);
