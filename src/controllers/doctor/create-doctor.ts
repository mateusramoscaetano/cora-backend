import { Request, Response } from "express";
import tryCatch from "../../middlewares/try-catch";
import { ICreateDoctorRequestDto } from "../../dtos/doctor/icreate-doctor-request.dto";
import { CreateDoctorService } from "../../services/doctor/create-doctor";

export const createDoctor = tryCatch(
  async (request: Request, response: Response) => {
    const { email, name, password, phone } =
      request.body as ICreateDoctorRequestDto;

    const createDoctorInstance = new CreateDoctorService();
    const doctor = await createDoctorInstance.createDoctor({
      email,
      name,
      password,
      phone,
    });

    response.status(201).json(doctor);
  }
);
