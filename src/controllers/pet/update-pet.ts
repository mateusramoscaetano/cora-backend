import { Request, Response } from "express";
import tryCatch from "../../middlewares/try-catch";
import { UpdatePetService } from "../../services/pet/update-pet";
import { IUpdatePetRequestDto } from "../../dtos/pet/iupdate-pet-request.dto";

export const updatePet = tryCatch(
  async (request: Request, response: Response) => {
    const { age, name } = request.body as IUpdatePetRequestDto;
    const { id } = request.params as { id: string };

    const updatePetInstance = new UpdatePetService();

    const updatePet = await updatePetInstance.UpdatePetService(
      { age, name },
      id
    );
    response.status(200).json(updatePet);
  }
);
