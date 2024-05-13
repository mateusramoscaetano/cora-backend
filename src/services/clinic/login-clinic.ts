import { compare } from "bcrypt";
import { unauthorized } from "../../helpers/errors-response";
import { sign } from "jsonwebtoken";
import { findClinicByEmail } from "../../repositories/clinic";

export class LoginClinicService {
  async loginClinic(email: string, password: string) {
    const clinic = await findClinicByEmail(email);

    if (clinic) {
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
