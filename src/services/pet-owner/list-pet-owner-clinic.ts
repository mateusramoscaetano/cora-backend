import { badRequest } from "../../helpers/errors-response";
import { findClinicById } from "../../repositories/clinic";
import { listPetOwnersByClinic } from "../../repositories/pet-owner";

export class ListPetOwnerClinicService {
  async listPetOwnerClinicService(id: string) {
    const clinic = await findClinicById(id);

    if (!clinic) {
      return badRequest("clinic");
    }

    const petOwners = await listPetOwnersByClinic(id);
    return petOwners;
  }
}
