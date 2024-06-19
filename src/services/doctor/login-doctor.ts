import { compare } from "bcrypt";
import { unauthorized } from "../../helpers/errors-response";
import { findDoctorByEmail } from "../../repositories/doctor";
import { sign } from "jsonwebtoken";

export class LoginDoctorService {
  async loginDoctor(email: string, password: string) {
    const doctor = await findDoctorByEmail(email);

    if (doctor) {
      const validatePassword = await compare(password, doctor.password);

      if (!validatePassword) {
        return unauthorized();
      }

      const token = sign({ id: doctor.id }, `${process.env.JWT_PASS}`, {
        expiresIn: "8h",
      });

      const { password: _, ...userData } = doctor;

      return { user: userData, token };
    }

    return unauthorized();
  }
}
