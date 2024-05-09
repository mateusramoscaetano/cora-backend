import { S3Client } from "@aws-sdk/client-s3";

import { endpoint, accessKeyId, secretAccessKey } from "../constants";

export const s3 = new S3Client({
  endpoint,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region: "us-east-005",
});
