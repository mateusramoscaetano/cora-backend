import { Request, Response } from "express";
import tryCatch from "../middlewares/try-catch";
import { badRequest, notFoundError } from "../helpers/errors-response";
import { findReportById } from "./report";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  accessKeyId,
  backblazeBucket,
  endpoint,
  secretAccessKey,
} from "../database/constants";

export const s3 = new S3Client({
  endpoint,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region: "us-east-005",
});

export const getObject = async (path: string) => {
  const command = new GetObjectCommand({
    Bucket: backblazeBucket,
    Key: path,
  });

  try {
    const response = await s3.send(command);

    console.log(response);

    return { response };
  } catch (err) {
    console.error(err);
  }
};

export const getReportDetail = async (id: string) => {
  const report = await findReportById(id);

  if (!report) {
    return notFoundError("report");
  }

  const response = await getObject(report.path);

  return response;
};

export class GetReportService {
  async getReportService(id: string) {
    const report = await getReportDetail(id);

    if (!report) {
      return badRequest("report");
    }

    return { report };
  }
}

export const getReport = tryCatch(
  async (request: Request, response: Response) => {
    const { id } = request.params as { id: string };

    const getReportInstance = new GetReportService();
    const getReport = await getReportInstance.getReportService(id);

    return response.status(200).send(getReport.report.response.Body);
  }
);
