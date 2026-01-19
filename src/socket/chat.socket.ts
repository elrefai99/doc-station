import { Namespace, Socket } from "socket.io";
import { socketMiddleware } from "../middleware/authentication/socket.middleware";
import { ioJoinRoom } from "./shared/ioJoin";
import { ioTyping } from "./hooks/ioTyping";
import { ioChat } from "./hooks/ioChat";

export const chatSocket = (io: Namespace,) => {
     const userSockets: Map<string, string> = new Map<string, string>();
     const chatSockets: Map<string, string> = new Map<string, string>();

     io.use(socketMiddleware);

     io.on('connection', async (socket: Socket) => {

          const senderID: string = socket.data.user._id.toString();
          userSockets.set(senderID, socket.id);
          chatSockets.set(senderID, socket.id);

          ioJoinRoom(socket)
          ioTyping(socket)
          ioChat(io, socket, userSockets)


          socket.on('disconnect', () => {
               if (userSockets.get(senderID) === socket.id) {
                    userSockets.delete(senderID);
               }
               if (chatSockets.get(senderID) === socket.id) {
                    chatSockets.delete(senderID);
               }
          });

     });
}
