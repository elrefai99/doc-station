import path from "path";
import fs from "fs-extra";
import { readFile } from "fs/promises";
import sharp from "sharp";
import cloudinary from "../../../config/cloudinary";

export class imageProcess {

     public async albumUpload(payload: any, ImagesID: any) {
          if (!payload || !payload["multiImage"]) {
               return { error: "No images uploaded" };
          }

          const uploadTasks = payload["multiImage"].map(async (file: any) => {
               try {
                    const url = await this.processAndUpload(file.filename, ImagesID, "product");
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
                    const url = await this.processAndUpload(file.filename, ImagesID, "product");
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
          const buffer = await sharp(
               await readFile(path.join(__dirname, '../../../../', `public/user/${imgName}`))
          ).resize({ width: 450, height: 450 })
               .webp({ quality: 100 })
               .toBuffer();

          const url = await this.uploadBuffer(buffer, `user/avatars/${userID}`);

          fs.unlink(path.join(__dirname, '../../../../', `public/user/${imgName}`), (err) => {
               if (err) console.log(err);
          });

          return url;
     };

     private async processAndUpload(imgName: string, id: any, folder: string): Promise<string> {
          const localPath = path.join(__dirname, '../../../../', `public/${folder}/${imgName}`);
          const buffer = await sharp(await readFile(localPath))
               .withMetadata()
               .webp({ quality: 100 })
               .toBuffer();

          const url = await this.uploadBuffer(buffer, `${folder}/${id}`);

          fs.unlink(localPath, (err) => {
               if (err) console.log(err);
          });

          return url;
     };

     private uploadBuffer(buffer: Buffer, folder: string): Promise<string> {
          return new Promise((resolve, reject) => {
               const stream = cloudinary.uploader.upload_stream(
                    {
                         folder: `doc-station/${folder}`,
                         format: "webp",
                         resource_type: "image",
                    },
                    (error, result) => {
                         if (error) return reject(error);
                         resolve(result!.secure_url);
                    }
               );
               stream.end(buffer);
          });
     };
}
