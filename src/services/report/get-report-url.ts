import { backblazeURL } from "../../database/constants";
import { notFoundError } from "../../helpers/errors-response";
import { findReportById } from "../../repositories/report";

export class GetReportUrlService {
  async getReportUrlService(id: string) {
    const report = await findReportById(id);

    if (!report) {
      return notFoundError("report");
    }

    const url = backblazeURL.concat(report.path);

    return url;
  }
}
