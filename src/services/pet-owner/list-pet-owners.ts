import { listPetOwners } from "../../repositories/pet-owner";

export class ListPetOwners {
  async listPetOwners(page: string) {
    const petOwners = await listPetOwners(page);

    return petOwners;
  }
}
