import { notFoundError } from "../../helpers/errors-response";
import { findDoctorById } from "../../repositories/doctor";

export class GetDoctorService {
  async getDoctorService(id: string) {
    const doctor = await findDoctorById(id);

    if (!doctor) {
      return notFoundError("doctor");
    }

    const { password: _, ...response } = doctor;

    return response;
  }
}
