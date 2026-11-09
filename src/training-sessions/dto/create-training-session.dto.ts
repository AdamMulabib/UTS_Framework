import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsDateString,
  IsIn,
  IsOptional,
  Min,
} from 'class-validator';

export class CreateTrainingSessionDto {
  @IsInt()
  @Min(1)
  trainerId: number;

  @IsString()
  @IsNotEmpty()
  sessionName: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  sessionDate: string;

  @IsString()
  @IsNotEmpty()
  startTime: string;

  @IsString()
  @IsNotEmpty()
  endTime: string;

  @IsInt()
  @Min(1)
  capacity: number;
}