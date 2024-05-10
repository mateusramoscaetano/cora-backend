import { notFoundError } from "../../helpers/errors-response";
import { listPets } from "../../repositories/pet";

export class ListPetsService {
  async listPetsService(id: string) {
    const pets = await listPets(id);

    if (!pets) {
      return notFoundError("pets");
    }

    return pets;
  }
}
