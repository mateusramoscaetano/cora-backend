import { Request, Response } from "express";
import tryCatch from "../../middlewares/try-catch";
import { DeletePetOwnerService } from "../../services/pet-owner/delete-pet-owner";

export const deletePetOwner = tryCatch(
  async (request: Request, response: Response) => {
    const { id } = request.params as { id: string };
    const deletePetOwnerInstance = new DeletePetOwnerService();

    const deletePetOwner = await deletePetOwnerInstance.deletePetOwnerService(
      id
    );
    response.status(200).json(deletePetOwner);
  }
);
