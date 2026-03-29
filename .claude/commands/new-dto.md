Add a new DTO (Data Transfer Object) class to a module's `DTO/index.dto.ts` for request validation.

Arguments: $ARGUMENTS
(Format: "<Module> <DtoName>" — e.g. "Booking CreateBookingDto")

## Instructions

Open `src/modules/<Module>/DTO/index.dto.ts` and add the new DTO class using `class-validator` decorators.

## Template

```ts
import { IsString, IsNumber, IsOptional, IsEmail, IsEnum, MinLength, MaxLength, IsBoolean, IsArray } from 'class-validator';

export class <DtoName> {
  @IsString()
  field: string;

  @IsNumber()
  numField: number;

  @IsOptional()
  @IsString()
  optionalField?: string;
}
```

## Available decorators (use only what fits)
- `@IsString()` — string value
- `@IsNumber()` — numeric value
- `@IsEmail()` — valid email format
- `@IsOptional()` — field may be absent
- `@IsEnum(EnumType)` — must match enum value
- `@IsBoolean()` — boolean
- `@IsArray()` — array
- `@MinLength(n, { message: '...' })` — minimum string length
- `@MaxLength(n, { message: '...' })` — maximum string length

## Rules
- Import enums from `'../../../generated/prisma'` (e.g. `UserRole`, `UserStatus`, `BookingStatus`)
- Keep the existing DTOs in the file intact — only append the new class
- The DTO class name should end in `Dto` (e.g. `CreateBookingDto`, `UpdateProfileDto`)
- Use the DTO in the controller: `const { field } = req.body as <DtoName>`
