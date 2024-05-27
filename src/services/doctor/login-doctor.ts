import { compare } from "bcrypt";
import { unauthorized } from "../../helpers/errors-response";
import { findDoctorByEmail } from "../../repositories/doctor";
import { sign } from "jsonwebtoken";
import { findClinicByEmail } from "../../repositories/clinic";

export class LoginDoctorService {
  async loginDoctor(email: string, password: string) {
    const doctor = await findDoctorByEmail(email);
    const clinic = await findClinicByEmail(email);

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
    } else if (clinic) {
      const validatePassword = await compare(password, clinic.password);

      if (!validatePassword) {
        return unauthorized();
      }

      const token = sign({ id: clinic.id }, `${process.env.JWT_PASS}`, {
        expiresIn: "8h",
      });

      const { password: _, ...userData } = clinic;

      return { user: userData, token };
    }

    return unauthorized();
  }
}
