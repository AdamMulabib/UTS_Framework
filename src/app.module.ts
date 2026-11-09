import { Module } from '@nestjs/common';

import { MembersModule } from './members/members.module.js';
import { TrainersModule } from './trainers/trainers.module.js';
import { MembershipPlansModule } from './membership-plans/membership-plans.module.js';
import { MembershipsModule } from './memberships/memberships.module.js';
import { TrainingSessionsModule } from './training-sessions/training-sessions.module.js';
import { SessionParticipantsModule } from './session-participants/session-participants.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [
    PrismaModule,
    MembersModule,
    TrainersModule,
    MembershipPlansModule,
    MembershipsModule,
    TrainingSessionsModule,
    SessionParticipantsModule,
  ],
})
export class AppModule {}