import { Request, Response } from "express";
import tryCatch from "../../middlewares/try-catch";
import { UpdateDoctorService } from "../../services/doctor/update-doctor";
import { IUpdateDoctorRequestDto } from "../../dtos/doctor/iupdate-doctor-request.dto";

export const updateDoctor = tryCatch(
  async (request: Request, response: Response) => {
    const { email, name, password, phone } =
      request.body as IUpdateDoctorRequestDto;
    const { id } = request.params as { id: string };

    const updateDoctorInstance = new UpdateDoctorService();
    const updateDoctor = await updateDoctorInstance.updateDoctorService(
      { email, name, password, phone },
      id
    );
    response.status(200).json(updateDoctor);
  }
);
