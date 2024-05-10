import { Request, Response } from "express";
import tryCatch from "../../middlewares/try-catch";
import { GetDoctorService } from "../../services/doctor/get-doctor";

export const getDoctor = tryCatch(
  async (request: Request, response: Response) => {
    const { id } = request.params as { id: string };

    const getDoctorInstance = new GetDoctorService();
    const getDoctor = await getDoctorInstance.getDoctorService(id);
    response.status(200).json(getDoctor);
  }
);
