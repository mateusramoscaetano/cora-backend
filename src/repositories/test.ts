import { backblazeBucket } from "../database/constants";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../database/s3";

export const createDoctor = async (
  mimetype?: string,
  path?: string,
  buffer?: Buffer
) => {
  const putObjectComand = new PutObjectCommand({
    Bucket: backblazeBucket,
    Key: path,
    Body: buffer,
    ContentType: mimetype,
  });

  try {
    await s3.send(putObjectComand);
  } catch (error) {
    console.log("error", error);
  }

  return { message: "upload success" };
};
