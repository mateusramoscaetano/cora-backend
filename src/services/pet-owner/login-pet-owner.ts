import { compare } from "bcrypt";
import { unauthorized } from "../../helpers/errors-response";
import { findDoctorByEmail } from "../../repositories/doctor";
import { sign } from "jsonwebtoken";
import { findPetOwnerByEmail } from "../../repositories/pet-owner";
import { findClinicByEmail } from "../../repositories/clinic";

export class LoginPetOwnerService {
  async loginPetOwner(email: string, password: string) {
    const petOwner = await findPetOwnerByEmail(email);
    const clinic = await findClinicByEmail(email);

    if (petOwner) {
      if (password !== petOwner.password) {
        return unauthorized();
      }

      const token = sign({ id: petOwner.id }, `${process.env.JWT_PASS}`, {
        expiresIn: "8h",
      });

      const { password: _, ...userData } = petOwner;

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
