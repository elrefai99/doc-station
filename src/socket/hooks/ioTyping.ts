import { Socket } from "socket.io";
import { UserModel } from "../../../Schema/User/user.schema";

export const ioTyping = (cred: Socket) => {
     cred.on('typing', async (room: string, receiverID: string): Promise<void> => {
          cred.join(room);
          const user = await UserModel.findById(receiverID, { fName: 1, lName: 1 })
          cred.to(room).emit("typing", room, `${user?.fName} ${user?.lName}`)
     })
}
