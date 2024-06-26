import { ICreateDoctorRequestDto } from "../../dtos/doctor/icreate-doctor-request.dto";
import { badRequest } from "../../helpers/errors-response";
import { hashPassword } from "../../helpers/hash-password";
import { createDoctor, findDoctorByEmail } from "../../repositories/doctor";

export class CreateDoctorService {
  async createDoctor(data: ICreateDoctorRequestDto) {
    const { email, password } = data;
    const doctor = await findDoctorByEmail(email);

    if (doctor) {
      badRequest("doctor");
    }

    const hashedPassword = await hashPassword(password);

    const result = await createDoctor({
      ...data,
      password: hashedPassword,
    });

    return result;
  }
}
