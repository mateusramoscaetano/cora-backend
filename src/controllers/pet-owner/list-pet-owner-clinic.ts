import { Request, Response } from "express";
import tryCatch from "../../middlewares/try-catch";
import { ListPetOwnerClinicService } from "../../services/pet-owner/list-pet-owner-clinic";

export const listPetOwnerByClinic = tryCatch(
  async (request: Request, response: Response) => {
    const { id } = request.params as { id: string };
    const { page } = request.query as { page: string };
    const listPetOwnerByClinicInstance = new ListPetOwnerClinicService();
    const listPetOwnerByClinic =
      await listPetOwnerByClinicInstance.listPetOwnerClinicService(id, page);
    response.status(200).json(listPetOwnerByClinic);
  }
);
