import { Request, Response } from "express";
import { DeleteClinicService } from "../../services/clinic/delete-clinic";
import tryCatch from "../../middlewares/try-catch";

export const deleteClinic = tryCatch(
  async (request: Request, response: Response) => {
    const { id } = request.params as { id: string };
    const deleteClinicInstance = new DeleteClinicService();

    const deleteClinic = await deleteClinicInstance.deleteClinicService(id);
    response.status(201).json(deleteClinic);
  }
);
