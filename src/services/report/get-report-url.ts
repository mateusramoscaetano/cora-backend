import { notFoundError } from "../../helpers/errors-response";
import { findReportById } from "../../repositories/report";

export class GetReportUrlService {
  async getReportUrlService(id: string) {
    const report = await findReportById(id);

    if (!report) {
      return notFoundError("report");
    }
    const { id: reportId, url } = report;

    return { reportId, url };
  }
}
