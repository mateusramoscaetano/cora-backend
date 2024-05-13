import { notFoundError } from "../../helpers/errors-response";
import { deleteDoctor, findDoctorById } from "../../repositories/doctor";

export class DeleteDoctorService {
  async deleteDoctorService(id: string) {
    const doctor = await findDoctorById(id);

    if (!doctor) {
      return notFoundError("doctor");
    }

    const result = await deleteDoctor(id);
    return result;
  }
}
