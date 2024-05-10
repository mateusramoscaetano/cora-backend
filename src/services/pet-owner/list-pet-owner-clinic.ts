import { notFoundError } from "../../helpers/errors-response";
import { findClinicById } from "../../repositories/clinic";
import { listPetOwnersByClinic } from "../../repositories/pet-owner";

export class ListPetOwnerClinicService {
  async listPetOwnerClinicService(id: string, page: string) {
    const clinic = await findClinicById(id);

    if (!clinic) {
      return notFoundError("clinic");
    }

    const petOwners = await listPetOwnersByClinic(id, page);
    return petOwners;
  }
}
