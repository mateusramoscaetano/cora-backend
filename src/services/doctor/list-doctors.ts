import { listDoctors } from "../../repositories/doctor";

export class ListDoctorsService {
  async listDoctorsService() {
    const doctors = await listDoctors();

    return doctors;
  }
}
