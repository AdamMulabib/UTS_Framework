import {
  IsInt,
  IsDateString,
  Min,
} from 'class-validator';

export class CreateMembershipDto {
  @IsInt()
  @Min(1)
  memberId: number;

  @IsInt()
  @Min(1)
  planId: number;

  @IsDateString()
  startDate: string;
}