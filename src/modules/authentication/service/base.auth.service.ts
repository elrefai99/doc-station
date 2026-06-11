import prisma from "../../../config/prisma"
import bcrypt from "bcrypt";
import { addJobToQueue } from "../../../Queue/Emails/queue.email";

export class baseAuthService {
     constructor() { }

     private async check_account(payload: any) {
          const user = await prisma.user.findFirst({
               where: {
                    email: payload.email.toLowerCase(),
               },
               select: {
                    id: true,
                    password: true,
               }
          })
          return user
     }

     public async register() {
          return "register"
     }

     async login(payload: any) {
          const { email, password } = payload
          const user = await this.check_account({ email })
          if (!user) {
               return { success: false, error: true, message: "there are error in email or password", data: null }
          }
          const cPassword = await bcrypt.compare(password, user?.password);
          if (!cPassword) {
               return { success: false, error: true, message: "there are error in email or password", data: null }
          }
          const email_body = {
               email: email,
               temp: `Success Login`,
               subject: "Login",
               type: "login"
          }
          await addJobToQueue("emails", email_body)

          return { success: true, error: false, message: "success login", data: { user_id: user.id } }
     }

     async refreshToken() {

     }
}
