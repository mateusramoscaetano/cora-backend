import { Request, Response } from "express";
import tryCatch from "../../middlewares/try-catch";
import { ListPetOwners } from "../../services/pet-owner/list-pet-owners";

export const listPetOwners = tryCatch(
  async (request: Request, response: Response) => {
    const { page, searchTerm } = request.query as {
      page: string;
      searchTerm?: string;
    };

    const listPetOwnersInstance = new ListPetOwners();

    const options = { page, searchTerm };

    const listPetOwners = await listPetOwnersInstance.listPetOwners(options);
    response.status(200).json(listPetOwners);
  }
);
