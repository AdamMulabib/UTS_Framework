
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsInt,
  Min,
} from 'class-validator';

export class CreateTrainerDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  specialization: string;

  @IsInt()
  @Min(0)
  experienceYears: number;
}
