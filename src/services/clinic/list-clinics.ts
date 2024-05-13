import { listClinics } from "../../repositories/clinic";

export class ListClinicService {
  async listClinicService(page: string, name?: string) {
    const clinics = await listClinics(page, name);
    return clinics;
  }
}
