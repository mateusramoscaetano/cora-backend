import { Request, Response } from "express";
import tryCatch from "../../middlewares/try-catch";
import { GetPetService } from "../../services/pet/get-pet";

export const getPet = tryCatch(async (request: Request, response: Response) => {
  const { id } = request.params as { id: string };
  const getPetInstance = new GetPetService();
  const getPet = await getPetInstance.getPetService(id);
  response.status(201).json(getPet);
});
