import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const R2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.R2_BUCKET_NAME!;
const PUBLIC_URL = process.env.R2_PUBLIC_URL!;

export async function generatePresignedUrl(
  filename: string,
  contentType: string
) {
  const ext = filename.split(".").pop() || "jpg";
  const key = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: contentType,
  });

  const presignedUrl = await getSignedUrl(R2, command, { expiresIn: 300 });

  const publicUrl = `${PUBLIC_URL}/${key}`;

  return { presignedUrl, publicUrl, key };
}
