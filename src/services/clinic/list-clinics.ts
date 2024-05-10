import { listClinics } from "../../repositories/clinic";

export class ListClinicService {
  async listClinicService(page: string) {
    const clinics = await listClinics(page);
    return clinics;
  }
}
