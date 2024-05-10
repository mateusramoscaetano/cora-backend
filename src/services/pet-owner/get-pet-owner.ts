import { notFoundError } from "../../helpers/errors-response";
import { getPetOwner } from "../../repositories/pet-owner";

export class GetPetOwnerService {
  async getPetOwnerService(id: string) {
    const petOwner = await getPetOwner(id);

    if (!petOwner) {
      notFoundError("pet owner");
    }

    return petOwner;
  }
}
