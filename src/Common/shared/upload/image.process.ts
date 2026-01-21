import path from "path";
import fs from "fs-extra";
import { readFile } from "fs/promises";
import sharp from "sharp";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import ServerError from "../../../utils/api.errors.utils";
import { aws_client } from "../../../config/aws";

export class imageProcess {

     public async albumUpload(payload: any, ImagesID: any) {
          console.log(payload);

          if (!payload || !payload["multiImage"]) {
               return { error: "No images uploaded" };
          }

          const uploadTasks = payload["multiImage"].map(async (file: any) => {
               try {
                    const url = await this.imageProcess(file.filename, ImagesID);
                    return { image: url, path: file.path };
               } catch (error) {
                    console.log(`Error uploading image: ${error}`)
                    return { error: "Failed to upload image", path: file.path };
               }
          });

          const results = await Promise.all(uploadTasks);
          return results;
     };
     public async thumbnailUpload(payload: any, ImagesID: any) {

          if (!payload.file || !payload.file["mainImage"]) {
               return { error: "No images uploaded" };
          }

          const uploadTasks = payload.file["mainImage"].map(async (file: any) => {
               try {
                    const url = await this.imageProcess(file.filename, ImagesID);
                    return { image: url, path: file.path };
               } catch (error) {
                    console.log(`Error uploading image: ${error}`)
                    return { error: "Failed to upload image", path: file.path };
               }
          });

          const results = await Promise.all(uploadTasks);
          return results;
     };

     public async avatarFunction(imgName: any, userID: any): Promise<string> {

          const watermark = sharp(
               await readFile(path.join(__dirname, '../../../../', `public/user/${imgName}`))
          ).resize({ width: 450, height: 450 })
               .webp({ quality: 100 })
               .toBuffer();

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

          const upload = new PutObjectCommand({
               Bucket: process.env.AWS_S3_BUCKET as string,
               Key: fileName,
               Body: await watermark,
               ContentType: "image/webp",
          })

          await aws_client.send(upload);
          fs.unlink(path.join(__dirname, '../../../../', `public/user/${imgName}`), (err) => {
               if (err) {
                    console.log(err);
               }
          });

          return `${process.env.IMAGE_SERVER_API}${fileName}`;
     };

     public async verifyImageUpload(payload: any, ImagesID: any) {
          if (!payload?.file || (!payload.file["nationalID"] && !payload.file["pics"])) {
               throw new ServerError("No images uploaded", 406);
          }
          const nationalID = payload.file["nationalID"] ? await this.verifyAccountProcess(payload.file["nationalID"][0].filename, ImagesID) : "";
          const pics = payload.file["pics"] ? await this.verifyAccountProcess(payload.file["pics"][0].filename, ImagesID) : "";

          return { pics, nationalID };
     }

     public async verifyAccountProcess(imageName: any, user: string): Promise<string> {
          const image = sharp(
               await readFile(path.join(__dirname, "../../../../", `public/user/${imageName}`))
          ).webp({ quality: 100 }).toBuffer()

          const fileName = `verify/user/${user}/${parseInt(
               Math.ceil(Math.random() * 100000001)
                    .toPrecision(8)
                    .toString()
                    .replace(".", "")
          )}.webp`;
          const upload = new PutObjectCommand({
               Bucket: process.env.AWS_S3_BUCKET as string,
               Key: fileName,
               Body: await image,
               ContentType: "image/webp",
          })

          await aws_client.send(upload);
          fs.unlink(path.join(__dirname, '../../../../', `public/user/${imageName}`), (err) => {
               if (err) {
                    console.log(err);
               }
          });
          return `${process.env.IMAGE_SERVER_API}${fileName}`;
     }

     private async imageProcess(imgName: any, userID: any): Promise<string> {
          const watermark = sharp(await readFile(path.join(__dirname, '../../../../', `public/product/${imgName}`))).withMetadata().webp({ quality: 100, }).toBuffer();

          const date = new Date();
          const day = date.getDate()
          const month = date.getMonth() + 1;
          const year = date.getFullYear();

          const fileName = `public/product/${year}/${month}/${day}/${userID}-${parseInt(
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
               path.join(__dirname, '../../../../', `public/product/${imgName}`),
               (err) => {
                    if (err) {
                         console.log(err);
                    }
               }
          );

          return `${process.env.IMAGE_SERVER_API}${fileName}`;
     };
}
