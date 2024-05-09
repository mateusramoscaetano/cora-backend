import dotenv from "dotenv";

dotenv.config();

export const endpoint = process.env.ENDPOINT_S3 || "";
export const accessKeyId = process.env.KEY_ID || "";
export const secretAccessKey = process.env.APP_KEY || "";
export const backblazeBucket = process.env.BACKBLAZE_BUCKET || "";
