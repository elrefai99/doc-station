import path from "path";
import fs from "fs-extra";
import { readFile } from "fs/promises";
import sharp from "sharp";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { aws_client } from "../../../config/aws";

export async function imagesUpload(payload: any, ImagesID: any) {
     if (!payload || !payload["images"]) {
          return { error: "No images uploaded" };
     }

     const uploadTasks = payload["images"].map(async (file: any) => {
          try {
               const url = await imageProcess(file.filename, ImagesID);
               return { image: url, path: file.path };
          } catch (error) {
               console.log(`Error uploading image: ${error}`)
               return { error: "Failed to upload image", path: file.path };
          }
     });

     const results = await Promise.all(uploadTasks);
     return results;
};

export async function imageProcess(imgName: any, userID: any): Promise<string> {
     const watermark = sharp(await readFile(path.join(__dirname, '../../../../', `public/user/${imgName}`))).withMetadata().webp({ quality: 100, }).toBuffer();

     const date = new Date();
     const day = date.getDate()
     const month = date.getMonth() + 1;
     const year = date.getFullYear();

     const fileName = `public/user/${year}/${month}/${day}/${userID}-${parseInt(
          Math.ceil(Math.random() * 100000001)
               .toPrecision(8)
               .toString()
               .replace(".", "")
     )}.webp`;
     const uploadParams = new PutObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET as string,
          Key: fileName,
          Body: await watermark,
          ContentType: "image/webp",
     });

     await aws_client.send(uploadParams);
     fs.unlink(
          path.join(__dirname, '../../../../', `public/user/${imgName}`),
          (err) => {
               if (err) {
                    console.log(err);
               }
          }
     );

     return `${process.env.CDN_CLOUD_URL}${fileName}`;
};
