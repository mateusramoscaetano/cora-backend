import { listDoctors } from "../../repositories/doctor";

export class ListDoctorsService {
  async listDoctorsService(page: string, name?: string) {
    const doctors = await listDoctors(page, name);

    return doctors;
  }
}
