import { IUpdateDoctorRequestDto } from "../../dtos/doctor/iupdate-doctor-request.dto";
import { badRequest, notFoundError } from "../../helpers/errors-response";
import { hashPassword } from "../../helpers/hash-password";
import {
  findDoctorByEmail,
  findDoctorById,
  updateDoctor,
} from "../../repositories/doctor";

export class UpdateDoctorService {
  async updateDoctorService(data: IUpdateDoctorRequestDto, id: string) {
    const { email, password } = data;

    const doctor = await findDoctorById(id);

    if (!doctor) {
      return notFoundError("doctor");
    }

    if (email) {
      const doctorEmailExist = await findDoctorByEmail(email);

      if (doctorEmailExist && doctorEmailExist.email !== doctor.email) {
        return badRequest("email");
      }
    }

    let hashedPassword = "";

    if (password) {
      hashedPassword = await hashPassword(password);
    }

    const result = await updateDoctor(
      { ...data, password: hashedPassword },
      id
    );

    const { password: _, ...createdUser } = result;

    return createdUser;
  }
}
