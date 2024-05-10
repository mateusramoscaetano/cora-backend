import { notFoundError } from "../../helpers/errors-response";
import { getPetDetail } from "../../repositories/pet";

export class GetPetService {
  async getPetService(id: string) {
    const pet = await getPetDetail(id);

    if (!pet) {
      return notFoundError("pet");
    }
    return pet;
  }
}
