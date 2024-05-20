import { listReports } from "../../repositories/report";

export class ListReportsService {
  async listReportsService(id: string) {
    const reports = await listReports(id);
    return reports;
  }
}
