import { Module } from '@nestjs/common';

import { SessionParticipantsController } from './session-participants.controller.js';
import { SessionParticipantsService } from './session-participants.service.js';

import { MembersModule } from '../members/members.module.js';
import { TrainingSessionsModule } from '../training-sessions/training-sessions.module.js';

@Module({
  imports: [MembersModule, TrainingSessionsModule],
  controllers: [SessionParticipantsController],
  providers: [SessionParticipantsService],
})
export class SessionParticipantsModule {}