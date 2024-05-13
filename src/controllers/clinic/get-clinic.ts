import { Request, Response } from "express";
import { GetClinicService } from "../../services/clinic/get-clinic";
import tryCatch from "../../middlewares/try-catch";

export const getClinic = tryCatch(
  async (request: Request, response: Response) => {
    const { id } = request.params as { id: string };

    const getClinicInstance = new GetClinicService();

    const getClinic = await getClinicInstance.getClinicService(id);
    response.status(201).json(getClinic);
  }
);
