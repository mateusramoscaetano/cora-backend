import { compare } from "bcrypt";
import { unauthorized } from "../../helpers/errors-response";
import { findDoctorByEmail } from "../../repositories/doctor";
import { sign } from "jsonwebtoken";
import { findPetOwnerByEmail } from "../../repositories/pet-owner";

export class LoginPetOwnerService {
  async loginPetOwner(email: string, password: string) {
    const petOwner = await findPetOwnerByEmail(email);

    if (petOwner) {
      const validatePassword = await compare(password, petOwner.password);

      if (!validatePassword) {
        return unauthorized();
      }

      const token = sign({ id: petOwner.id }, `${process.env.JWT_PASS}`, {
        expiresIn: "8h",
      });

      const { password: _, ...userData } = petOwner;

      return { user: userData, token };
    }

    return unauthorized();
  }
}
