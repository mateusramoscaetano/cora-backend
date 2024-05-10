import { Request, Response } from "express";
import tryCatch from "../../middlewares/try-catch";
import { CreateClinicService } from "../../services/clinic/create-clinic";
import { ICreateClinicRequestDto } from "../../dtos/clinic/icreate-clinic-request.dto";

export const createClinic = tryCatch(
  async (request: Request, response: Response) => {
    const { address, email, name, password, phone } =
      request.body as ICreateClinicRequestDto;

    const createClinicInstance = new CreateClinicService();
    const clinic = await createClinicInstance.createClinicService({
      address,
      email,
      name,
      password,
      phone,
    });
    response.status(201).json(clinic);
  }
);
