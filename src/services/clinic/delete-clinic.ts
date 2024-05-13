import { notFoundError } from "../../helpers/errors-response";
import { deleteClinic, findClinicById } from "../../repositories/clinic";

export class DeleteClinicService {
  async deleteClinicService(id: string) {
    const clinic = await findClinicById(id);

    if (!clinic) {
      return notFoundError("clinic");
    }

    const result = await deleteClinic(id);

    return result;
  }
}
