import { S3Client } from "@aws-sdk/client-s3";

export const aws_client = new S3Client({
     region: process.env.AWS_IAM_REGION as string,
     credentials: {
          accessKeyId: process.env.AWS_IAM_ACCESS_KEY as string,
          secretAccessKey: process.env.AWS_IAM_SECRET_ACCESS_KEY as string
     }
})
