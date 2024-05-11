import { Request, Response } from "express";
import { UpdateClinicService } from "../../services/clinic/update-clinic";
import tryCatch from "../../middlewares/try-catch";
import { IUpdateClinicRequestDto } from "../../dtos/clinic/iupdate-clinic-request.dto";

export const updateClinic = tryCatch(
  async (request: Request, response: Response) => {
    const { id } = request.params as { id: string };
    const { address, email, name, password, phone } =
      request.body as IUpdateClinicRequestDto;
    const updateClinicInstance = new UpdateClinicService();
    const updateClinic = await updateClinicInstance.updateClinicService(
      { address, email, name, password, phone },
      id
    );
    response.status(200).json(updateClinic);
  }
);
