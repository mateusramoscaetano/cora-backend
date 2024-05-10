import { Request, Response } from "express";
import tryCatch from "../../middlewares/try-catch";
import { ListPetOwners } from "../../services/pet-owner/list-pet-owners";

export const listPetOwners = tryCatch(
  async (request: Request, response: Response) => {
    const listPetOwnersInstance = new ListPetOwners();
    const listPetOwners = await listPetOwnersInstance.listPetOwners();
    response.status(200).json(listPetOwners);
  }
);
