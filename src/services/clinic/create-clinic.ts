import { ICreateClinicRequestDto } from "../../dtos/clinic/icreate-clinic-request.dto";
import { badRequest } from "../../helpers/errors-response";
import { hashPassword } from "../../helpers/hash-password";
import { createClinic, findClinicByEmail } from "../../repositories/clinic";

export class CreateClinicService {
  async createClinicService(data: ICreateClinicRequestDto) {
    const { email, password } = data;

    const clinic = await findClinicByEmail(email);

    if (clinic) {
      badRequest("clinic");
    }

    const hashedPassword = await hashPassword(password);

    const result = await createClinic({ ...data, password: hashedPassword });

    const { password: _, ...createdUser } = result;

    return createdUser;
  }
}
