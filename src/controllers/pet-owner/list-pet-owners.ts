import { Request, Response } from "express";
import tryCatch from "../../middlewares/try-catch";
import { ListPetOwners } from "../../services/pet-owner/list-pet-owners";

export const listPetOwners = tryCatch(
  async (request: Request, response: Response) => {
    const { page, doctorId, doctorName, petName } = request.query as {
      page: string;
      doctorId?: string;
      doctorName: string;
      petName: string;
    };

    const listPetOwnersInstance = new ListPetOwners();

    const options = { page, doctorId, doctorName, petName };

    const listPetOwners = await listPetOwnersInstance.listPetOwners(options);
    response.status(200).json(listPetOwners);
  }
);
