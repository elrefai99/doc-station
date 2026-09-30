import { Socket } from "socket.io";

export const ioJoinRoom = (cred: Socket) => {
     cred.on('join_room', (room: string) => {
          cred.join(room);
     })
     cred.on('leave_room', (room: string) => {
          cred.leave(room);
     });
}
