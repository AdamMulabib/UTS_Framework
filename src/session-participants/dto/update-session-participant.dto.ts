import { PartialType } from '@nestjs/mapped-types';
import { CreateSessionParticipantDto } from './create-session-participant.dto.js';

export class UpdateSessionParticipantDto extends PartialType(
  CreateSessionParticipantDto,
) {}