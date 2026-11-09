import {
  IsInt,
  IsDateString,
  Min,
} from 'class-validator';

export class CreateSessionParticipantDto {
  @IsInt()
  @Min(1)
  sessionId: number;

  @IsInt()
  @Min(1)
  memberId: number;

  @IsDateString()
  registrationDate: string;
}