import { Request, Response } from "express";
import { GetPetOwnerService } from "../../services/pet-owner/get-pet-owner";
import tryCatch from "../../middlewares/try-catch";

export const getPetOwner = tryCatch(
  async (request: Request, response: Response) => {
    const { id } = request.params as { id: string };
    const getPetOwnerInstance = new GetPetOwnerService();
    const getPetOwner = await getPetOwnerInstance.getPetOwnerService(id);
    response.status(201).json(getPetOwner);
  }
);
