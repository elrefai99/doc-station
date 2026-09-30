import { Namespace, Socket } from "socket.io";
import { socketMiddleware } from "../middleware/authentication/socket.middleware";

export const userNotificationSockets = new Map<string, string>();

export const notifiactionSocket = (io: Namespace,) => {
     io.use(socketMiddleware);

     io.on('connection', async (socket: Socket) => {
          const senderID: string = socket.data.user._id.toString();
          userNotificationSockets.set(senderID, socket.id);
          socket.on('disconnect', () => {
               if (userNotificationSockets.get(senderID) === socket.id) {
                    userNotificationSockets.delete(senderID);
               }
          });
     });
}
