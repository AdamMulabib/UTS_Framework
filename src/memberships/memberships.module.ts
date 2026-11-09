import { Module } from '@nestjs/common';
import { MembershipsController } from './memberships.controller.js';
import { MembershipsService } from './memberships.service.js';
import { MembersModule } from '../members/members.module.js';
import { MembershipPlansModule } from '../membership-plans/membership-plans.module.js';

@Module({
  imports: [MembersModule, MembershipPlansModule],
  controllers: [MembershipsController],
  providers: [MembershipsService],
})
export class MembershipsModule {}