import { Request, Response } from "express";
import tryCatch from "../../middlewares/try-catch";
import { DeleteDoctorService } from "../../services/doctor/delete-doctor";

export const deleteDoctor = tryCatch(
  async (request: Request, response: Response) => {
    const { id } = request.params as { id: string };
    const deleteDoctorInstance = new DeleteDoctorService();

    const deleteDoctor = await deleteDoctorInstance.deleteDoctorService(id);
    response.status(201).json(deleteDoctor);
  }
);
