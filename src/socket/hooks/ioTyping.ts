import { Socket } from "socket.io";
import prisma from "../../config/prisma";

export const ioTyping = (cred: Socket) => {
     cred.on('typing', async (room: string, receiverID: string): Promise<void> => {
          cred.join(room);
          const user = await prisma.user.findUnique({
               where: { id: Number(receiverID) },
               select: { fullname: true }
          })
          cred.to(room).emit("typing", room, `${user?.fullname}`)
     })
}
