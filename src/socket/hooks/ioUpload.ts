import { PutObjectCommand } from "@aws-sdk/client-s3";
import { Namespace, Socket } from "socket.io";
import { bucketName, s3Client } from "../../../config/AWS/s3.aws.config";
import { getContentType } from "../../../Common/Shared/upload/image.contenttype";
import { dmModel } from "../../../Schema/chat/dm.schema";
import { UserModel } from "../../../Schema/User/user.schema";
import { notificationChat } from "../../../Middleware/notification/chat.middlware";

export const ioUpload = (io: Namespace, cred: Socket, userSockets: any) => {
     const senderID: string = cred.data.user._id.toString();
     userSockets.set(senderID, cred.id);

     cred.on("upload-chat", async (file: { buffer: ArrayBuffer, name: string }, room, receiverID, _callback) => {
          try {
               cred.join(room);

               const fileName = file.name || `file-${Date.now()}`;
               const fileBuffer = Buffer.from(file.buffer);

               const command = new PutObjectCommand({
                    Bucket: bucketName,
                    Key: `v-chat/${fileName}`,
                    Body: fileBuffer,
                    ContentType: getContentType(fileName),
               });

               await s3Client.send(command);
               const fileUrl = `${process.env.CDN_CLOUD_URL}/v-chat/${fileName}`;
               const chat = await dmModel.create({
                    chatID: room._id,
                    senderID,
                    image: fileUrl
               });
               const sender = await UserModel.findById(senderID).select('fName lName avatar');
               io.to(room).emit('message_sent', {
                    ...chat.toObject(),
                    senderID: {
                         _id: sender?._id,
                         fullname: `${sender?.fName} ${sender?.lName}`,
                    }
               });
               const receiverNotification = userSockets.get(receiverID);
               await notificationChat(cred, receiverNotification, receiverID, sender);

          } catch (err: any) {
               console.error("S3 upload error:", err);
          }
     });
}
