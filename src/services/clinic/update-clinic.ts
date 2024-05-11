import { IUpdateClinicRequestDto } from "../../dtos/clinic/iupdate-clinic-request.dto";
import { badRequest, notFoundError } from "../../helpers/errors-response";
import { hashPassword } from "../../helpers/hash-password";
import {
  findClinicByEmail,
  findClinicById,
  updateClinic,
} from "../../repositories/clinic";

export class UpdateClinicService {
  async updateClinicService(data: IUpdateClinicRequestDto, id: string) {
    const { email, password } = data;

    const clinic = await findClinicById(id);

    if (!clinic) {
      return notFoundError("clinic");
    }

    if (email) {
      const clinicExist = await findClinicByEmail(email);

      if (clinicExist && clinicExist.email !== clinic.email) {
        return badRequest("email");
      }
    }

    let hashedPassword = "";

    if (password) {
      hashedPassword = await hashPassword(password);
    }

    const result = await updateClinic(
      { ...data, password: hashedPassword },
      id
    );

    const { password: _, ...createdUser } = result;

    return createdUser;
  }
}
