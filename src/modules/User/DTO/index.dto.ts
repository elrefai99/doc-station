import { IsString, } from 'class-validator';
import { UserRole } from '../../../generated/prisma';

export class userprofile {

     @IsString()
     public fullname: string;

     @IsString()
     public code: string;

     @IsString()
     public phone: string;

     @IsString()
     public role: UserRole;

}
