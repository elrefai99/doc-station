import { IsString, IsOptional } from 'class-validator';

export class PaymentDto {

    @IsString()
    public field: string;

    // Add more fields as needed
}