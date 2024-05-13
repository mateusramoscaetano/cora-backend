import { notFoundError } from "../../helpers/errors-response";
import { deletePet, findPetById } from "../../repositories/pet";

export class DeletePetService {
  async deletePetService(id: string) {
    const pet = await findPetById(id);

    if (!pet) {
      return notFoundError("pet");
    }

    const result = await deletePet(id);

    return result;
  }
}
