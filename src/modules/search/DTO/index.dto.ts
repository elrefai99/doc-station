import { IsNumber, IsOptional, IsString } from "class-validator";

export class SearchDoctorDto {

     @IsString()
     @IsOptional()
     fullname?: string;

     @IsString()
     @IsOptional()
     governorate?: string;

     @IsString()
     @IsOptional()
     city?: string;

     @IsString()
     @IsOptional()
     timeStart?: string;

     @IsString()
     @IsOptional()
     timeEnd?: string;

     @IsString()
     @IsOptional()
     dateFrom?: string;

     @IsString()
     @IsOptional()
     dateTo?: string;

     @IsNumber()
     @IsOptional()
     priceFrom?: number;

     @IsNumber()
     @IsOptional()
     priceTo?: number;

     @IsString()
     @IsOptional()
     limit?: string;

     @IsString()
     @IsOptional()
     page?: string;
}
