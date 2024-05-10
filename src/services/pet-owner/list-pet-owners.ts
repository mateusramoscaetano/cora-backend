import { listPetOwners } from "../../repositories/pet-owner";

export class ListPetOwners {
  async listPetOwners() {
    const petOwners = await listPetOwners();

    return petOwners;
  }
}
