import { ICreatePetOwnerRequestDto } from "../../dtos/doctor/icreate-pet-owner-request.dto";

import { hashPassword } from "../../helpers/hash-password";

import { createPetOwner } from "../../repositories/pet-owner";

export class CreatePetOwnerService {
  async createPetOwner(data: ICreatePetOwnerRequestDto, doctorId: string) {
    const { email, name, password, phone, clinicId } = data;

    const hashedPassword = await hashPassword(password);

    const result = await createPetOwner(
      { name, email, password: hashedPassword, phone, clinicId },
      doctorId
    );

    return result;
  }
}
