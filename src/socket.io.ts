import { Namespace, Server } from "socket.io";
import { ioSocket } from "./app";
import { chatSocket } from "./socket/chat.socket";
import { notifiactionSocket } from "./socket/notification.socket";

let notificationNamespace: ReturnType<Server['of']>;

export const socketFunction = () => {
     const chatNamespace: Namespace = ioSocket.of('/chat');
     notificationNamespace = ioSocket.of('/notification');

     chatSocket(chatNamespace)
     notifiactionSocket(notificationNamespace)
};
export const getNotificationNamespace = (): Namespace => notificationNamespace;
