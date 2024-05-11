import { IUpdatePetRequestDto } from "../../dtos/pet/iupdate-pet-request.dto";
import { notFoundError } from "../../helpers/errors-response";
import { findPetById, updatePet } from "../../repositories/pet";

export class UpdatePetService {
  async UpdatePetService(data: IUpdatePetRequestDto, id: string) {
    const pet = await findPetById(id);

    if (!pet) {
      return notFoundError("pet");
    }

    const result = await updatePet(data, id);

    return result;
  }
}
