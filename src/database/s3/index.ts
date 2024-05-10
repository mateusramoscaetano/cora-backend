import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

import {
  endpoint,
  accessKeyId,
  secretAccessKey,
  backblazeBucket,
} from "../constants";

export const s3 = new S3Client({
  endpoint,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region: "us-east-005",
});

export const putObject = async (
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

export const getObject = async (path: string) => {
  const command = new GetObjectCommand({
    Bucket: backblazeBucket,
    Key: path,
  });

  try {
    const { Body } = await s3.send(command);

    return { Body, path };
  } catch (err) {
    console.error(err);
  }
};
