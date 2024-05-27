import { Request, Response } from "express";
import tryCatch from "../../middlewares/try-catch";
import { CreatePetService } from "../../services/pet/create-pet";
import { ICreatePetRequestDto } from "../../dtos/pet/icreate-pet-request.dto";

export const createPet = tryCatch(
  async (request: Request, response: Response) => {
    const { name, age, race, specie } = request.body as ICreatePetRequestDto;
    const { petOwnerId } = request.params as { petOwnerId: string };

    const createPetInstance = new CreatePetService();
    const Pet = await createPetInstance.createPet(
      {
        name,
        age,
        race,
        specie,
      },
      petOwnerId
    );

    response.status(201).json(Pet);
  }
);
