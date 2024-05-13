import { notFoundError } from "../../helpers/errors-response";
import { deletePetOwner, findPetOwnerById } from "../../repositories/pet-owner";

export class DeletePetOwnerService {
  async deletePetOwnerService(id: string) {
    const petOwner = await findPetOwnerById(id);
    if (!petOwner) {
      return notFoundError("pet owner");
    }
    const result = await deletePetOwner(id);
    return result;
  }
}
