import { Request, Response } from "express";
import tryCatch from "../../middlewares/try-catch";
import { listAllPets } from "../../repositories/pet";

export const listAllPetsController = tryCatch(
  async (request: Request, response: Response) => {
    const { page, searchTerm } = request.query as {
      page: string;
      searchTerm?: string;
    };

    const listAllPetsController = await listAllPets(page, searchTerm);
    response.status(200).json(listAllPetsController);
  }
);
