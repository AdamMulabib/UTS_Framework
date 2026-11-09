
import { Module } from '@nestjs/common';
import { MembershipPlansController } from './membership-plans.controller.js';
import { MembershipPlansService } from './membership-plans.service.js';

@Module({
  controllers: [MembershipPlansController],
  providers: [MembershipPlansService],
  exports: [MembershipPlansService],
})
export class MembershipPlansModule {}
