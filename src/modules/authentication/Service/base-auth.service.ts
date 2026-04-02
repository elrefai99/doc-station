import { token_PASETO } from "../utils/paseto.utils"
import { registerDto } from "../DTO/index.dto"
import prisma from "../../../config/prisma"
import bcrypt from "bcrypt";
import { UserRole, UserStatus } from "../../../generated/prisma"

export class BasedAuthService {
     constructor() { }

     public async check_account(payload: string) {
          const user = await prisma.user.findFirst({
               where: {
                    email: payload.toLowerCase(),
                    status: UserStatus.ACTIVE
               }
          })

          return user
     }

     public async create_account(payload: registerDto) {
          const { fullname, code, phone, role, email, password } = payload
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);

          const username = `${fullname.toLowerCase().split(' ').join('_')}_${Math.floor(Math.random() * 1000)}`
          const user = await prisma.user.create({
               data: {
                    email: email.toLowerCase(),
                    fullname,
                    username,
                    code,
                    phone,
                    status: UserStatus.INACTIVE,
                    role: role as UserRole,
                    password: hashedPassword,
               }
          })

          const access_token = await this.create_token({ _id: user.id.toString(), type: 'access' })
          const refresh_token = await this.create_token({ _id: user.id.toString(), type: 'refresh' })

          return { success: true, access_token, refresh_token }
     }

     public async create_token(payload: { _id: string; type: 'access' | 'refresh' | 'forget_password'; access_device?: string }): Promise<string> {
          const tokenPayload = {
               data: { user_id: payload._id },
               access_device: payload.access_device ?? 'unknown',
          }

          switch (payload.type) {
               case 'access':
                    return token_PASETO(tokenPayload, 'access')

               case 'refresh':
                    return token_PASETO(tokenPayload, 'refresh')

               case 'forget_password':
                    return token_PASETO(tokenPayload, 'forget_password')
          }
     }
}
