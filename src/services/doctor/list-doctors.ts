import { listDoctors } from "../../repositories/doctor";

export class ListDoctorsService {
  async listDoctorsService(page: string) {
    const doctors = await listDoctors(page);

    return doctors;
  }
}
