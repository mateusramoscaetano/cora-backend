import { IUpdatePetOwnerRequestDto } from "../../dtos/pet-owner/iupdate-pet-owner-request.dto";
import { badRequest, notFoundError } from "../../helpers/errors-response";
import { hashPassword } from "../../helpers/hash-password";
import { updateDoctor } from "../../repositories/doctor";
import {
  findPetOwnerByEmail,
  findPetOwnerById,
  updateClinicPetOwner,
} from "../../repositories/pet-owner";

export class UpdatePetOwnerService {
  async updatePetOwnerService(
    data: IUpdatePetOwnerRequestDto,
    doctorId: string,
    id: string
  ) {
    const { email, password } = data;

    const petOwner = await findPetOwnerById(id);

    if (!petOwner) {
      return notFoundError("pet owner");
    }

    if (email) {
      const petOwnerExist = await findPetOwnerByEmail(email);

      if (petOwnerExist && petOwnerExist.email !== petOwner.email) {
        return badRequest("email");
      }
    }

    let hashedPassword = "";

    if (password) {
      hashedPassword = await hashPassword(password);
    }

    const result = await updateClinicPetOwner(
      { ...data, password: hashedPassword },
      doctorId,
      id
    );

    const { password: _, ...createdUser } = result;

    return createdUser;
  }
}
