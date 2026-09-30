import { IsString, MinLength, MaxLength, } from 'class-validator';
import { UserRole } from '../../../generated/prisma';

export class loginDto {

     @IsString()
     public email: string;

     @IsString()
     public password: string;

}

export class registerDto {

     @IsString()
     public fullname: string;

     @IsString()
     public code: string;

     @IsString()
     public phone: string;

     @IsString()
     public role: UserRole;

     @IsString()
     public email: string;

     @IsString()
     @MinLength(8, { message: 'Password must be at least 8 characters long' })
     @MaxLength(20, { message: 'Password must not exceed 20 characters' })
     public password: string;
}

export class resetPasswordDTO {

     @IsString()
     public token: string;

     @IsString()
     @MinLength(8, { message: 'Password must be at least 8 characters long' })
     @MaxLength(20, { message: 'Password must not exceed 20 characters' })
     public password: string;

     @IsString()
     @MinLength(8, { message: 'Password must be at least 8 characters long' })
     @MaxLength(20, { message: 'Password must not exceed 20 characters' })
     public confirmPassword: string;
}
