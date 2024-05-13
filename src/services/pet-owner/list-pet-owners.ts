import { IListPetOwnersOptions } from "../../dtos/pet-owner/ilist-pet-owner-options.dto";
import { listPetOwners } from "../../repositories/pet-owner";

export class ListPetOwners {
  async listPetOwners(options: IListPetOwnersOptions) {
    const petOwners = await listPetOwners(options);

    return petOwners;
  }
}
