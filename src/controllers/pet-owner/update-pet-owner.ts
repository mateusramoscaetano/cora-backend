import { Request, Response } from "express";
import tryCatch from "../../middlewares/try-catch";
import { UpdatePetOwnerService } from "../../services/pet-owner/update-pet-owner";
import { IUpdatePetOwnerRequestDto } from "../../dtos/pet-owner/iupdate-pet-owner-request.dto";

export const updatePetOwner = tryCatch(
  async (request: Request, response: Response) => {
    const { clinicId, email, name, password, phone } =
      request.body as IUpdatePetOwnerRequestDto;
    const { id: doctorId } = request.user;
    const { id } = request.params as { id: string };

    const updatePetOwnerInstance = new UpdatePetOwnerService();

    const updatePetOwner = await updatePetOwnerInstance.updatePetOwnerService(
      { clinicId, email, name, password, phone },
      doctorId,
      id
    );
    response.status(200).json(updatePetOwner);
  }
);
