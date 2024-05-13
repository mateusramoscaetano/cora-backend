import { Request, Response } from "express";
import tryCatch from "../../middlewares/try-catch";
import { DeletePetService } from "../../services/pet/delete-pet";

export const deletePet = tryCatch(
  async (request: Request, response: Response) => {
    const { id } = request.params as { id: string };
    const deletePetInstance = new DeletePetService();

    const deletePet = await deletePetInstance.deletePetService(id);
    response.status(200).json(deletePet);
  }
);
