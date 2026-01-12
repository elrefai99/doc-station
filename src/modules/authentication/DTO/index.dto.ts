import { IsString, MinLength, MaxLength, IsOptional, IsNumber } from 'class-validator';

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
     public dob: string;

     @IsString()
     public cPassword: string;

     @IsString()
     public email: string;

     @IsString()
     @MinLength(8, { message: 'Password must be at least 8 characters long' })
     @MaxLength(20, { message: 'Password must not exceed 20 characters' })
     public password: string;

     @IsString()
     @IsOptional()
     public referrelCode?: string;

     @IsString()
     @IsOptional()
     public referral?: string;

     @IsString()
     @IsOptional()
     public cohost?: string;

     @IsNumber()
     @IsOptional()
     public referrelUse?: number;

     @IsNumber()
     @IsOptional()
     public points?: number;
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
