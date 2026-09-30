import { Namespace, Socket } from "socket.io";
import { getNotificationNamespace } from "../../socket.io";
import prisma from "../../config/prisma";
import { addJobToQueue } from "../../Queue/Emails/queue.email";
import { userNotificationSockets } from "../notification.socket";

export const ioChat = (io: Namespace, cred: Socket, userSockets: any) => {
     const senderID: string = cred.data.user._id.toString();
     userSockets.set(senderID, cred.id);

     cred.on('send_message', async (room: string, receiverID: string, text: string) => {
          cred.join(room);

          let usersRoom = await prisma.rooms.findFirst({
               where: {
                    id: Number(room),
               }
          })
          const chat = await prisma.dmChat.create({
               data: {
                    chatID: Number(usersRoom?.id),
                    senderID: Number(senderID),
                    message: text,
                    organicMessge: text,
               }
          });

          // Update the room's last message
          if (usersRoom?.id) {
               await prisma.rooms.update({
                    where: { id: usersRoom.id },
                    data: { lastMassage: text }
               });
          }

          io.to(room).emit('message_sent', {
               ...chat,
               senderID: {
                    _id: cred.data.user?._id,
                    fullname: `${cred.data.user?.fullname}`,
               }
          });
          const notificationIO = getNotificationNamespace();
          await prisma.notification.create({
               data: {
                    userId: Number(receiverID),
                    status: 'unread',
                    content: `New message from ${cred.data.user?.fullname}`,
                    link: `/en/user/inbox`
               }
          })

          let otherUserId: number | undefined = usersRoom?.senderID.toString() === senderID ? usersRoom?.receiverID : usersRoom?.senderID;

          if (!otherUserId) return;

          const userData = await prisma.user.findUnique({
               where: { id: otherUserId },
               select: {
                    fullname: true,
                    username: true,
                    email: true,
                    avatar: true,
               }
          });

          if (userData) {
               const data = {
                    email: userData.email,
                    user: userData.fullname,
                    senderName: {
                         name: `${cred.data.user?.fName} ${cred.data.user?.lName}`,
                         avatar: cred.data.user?.avatar
                    },
                    message: text,
                    type: "chat",
                    subject: "New Message Notification",
               };
               await addJobToQueue("emailQueue", data);
          }

          const receiverNotification = userSockets.get(receiverID);
          const gSender: any = userNotificationSockets.get(receiverID);
          notificationIO.to(gSender).emit("notification:now", {
               title: `${cred.data.user?.fName} ${cred.data.user?.lName} sent you a message`,
               link: `/user/inbox`
          });
          notificationIO.to(receiverNotification).emit('notification_message', {
               title: `${cred.data.user?.fName} ${cred.data.user?.lName} sent you a message`,
               link: `/user/inbox`
          });
     });
}
