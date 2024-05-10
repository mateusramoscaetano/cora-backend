import { Request, Response } from "express";
import tryCatch from "../../middlewares/try-catch";
import { ListPetsService } from "../../services/pet/list-pets";

export const listPets = tryCatch(
  async (request: Request, response: Response) => {
    const { id } = request.params as { id: string };

    const listPetsInstance = new ListPetsService();
    const listPets = await listPetsInstance.listPetsService(id);
    response.status(200).json(listPets);
  }
);
