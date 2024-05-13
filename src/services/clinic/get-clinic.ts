import { notFoundError } from "../../helpers/errors-response";
import { findClinicById } from "../../repositories/clinic";

export class GetClinicService {
  async getClinicService(id: string) {
    const clinic = await findClinicById(id);

    if (!clinic) {
      return notFoundError("clinic");
    }

    const { password: _, ...response } = clinic;

    return response;
  }
}
