import { notFoundError } from "../../helpers/errors-response";
import { deleteReport, findReportById } from "../../repositories/report";

export class DeleteReportService {
  async deleteReportService(id: string) {
    const report = await findReportById(id);

    if (!report) {
      return notFoundError("report");
    }

    const result = await deleteReport(id);
    return result;
  }
}
