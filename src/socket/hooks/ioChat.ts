import { Namespace, Socket } from "socket.io";
import { getNotificationNamespace } from "../../socket.io";

export const ioChat = (io: Namespace, cred: Socket, userSockets: any) => {
     const senderID: string = cred.data.user._id.toString();
     userSockets.set(senderID, cred.id);

     cred.on('send_message', async (room: string, receiverID: string, text: string) => {
          cred.join(room);
          const { message, wrong } = filterWords(text)

          let usersRoom: any = await roomModel.findOne({ _id: room, type: "chat" }, { _id: 1, senderID: 1, receiverID: 1 });

          const chat = await dmModel.create({
               chatID: room,
               senderID,
               message,
               organicMessge: text,
               wrong
          });
          usersRoom!.lastMassage = message;
          await usersRoom.save();

          io.to(room).emit('message_sent', {
               ...chat.toObject(),
               senderID: {
                    _id: cred.data.user?._id,
                    fullname: `${cred.data.user?.fName} ${cred.data.user?.lName}`,
               }
          });
          const notificationIO = getNotificationNamespace();
          await prisma.
          await notificationModel.create({
               user: receiverID,
               content: `New message from ${cred.data.user?.fName} ${cred.data.user?.lName}`,
               link: `/en/user/inbox`
          })

          let otherUserId: string = usersRoom?.senderID.toString() === senderID ? usersRoom?.receiverID : usersRoom?.senderID;

          const userData = await UserModel.findById(otherUserId, { fName: 1, username: 1, email: 1, avatar: 1, notification_emails: 1 });

          if (userData && userData?.notification_emails.guest_and_host_message) {

               const data = {
                    email: userData.email,
                    user: `${userData?.fName} ${userData?.lName}`,
                    senderName: {
                         name: `${cred.data.user?.fName} ${cred.data.user?.lName}`,
                         avatar: cred.data.user?.avatar
                    },
                    message: message,
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
          await notificationCount(receiverID);
     });
}
