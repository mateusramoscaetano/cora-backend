import { ICreatePetRequestDto } from "../../dtos/pet/icreate-pet-request.dto";
import { createPet } from "../../repositories/pet/create-pet";

export class CreatePetService {
  async createPet(data: ICreatePetRequestDto, petOwnerId: string) {
    const pet = await createPet(data, petOwnerId);

    return pet;
  }
}
