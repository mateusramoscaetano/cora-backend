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

    const updateData = { ...data };

    if (password) {
      const hashedPassword = await hashPassword(password);
      updateData.password = hashedPassword;
    } else {
      delete updateData.password;
    }

    const result = await updateClinic(updateData, id);

    const { password: _, ...updatedClinic } = result;

    return updatedClinic;
  }
}
