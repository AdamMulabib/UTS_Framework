
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateMembershipDto } from './dto/create-membership.dto.js';
import { UpdateMembershipDto } from './dto/update-membership.dto.js';

@Injectable()
export class MembershipsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.membership.findMany({
      include: {
        member: true,
        plan: true,
      },
    });
  }

  async findOne(id: number) {
    const membership = await this.prisma.membership.findUnique({
      where: { id },
      include: {
        member: true,
        plan: true,
      },
    });

    if (!membership) {
      throw new NotFoundException(
        `Membership with ID ${id} not found`,
      );
    }

    return membership;
  }

  async create(createMembershipDto: CreateMembershipDto) {
    const member = await this.prisma.member.findUnique({
      where: { id: createMembershipDto.memberId },
    });

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    if (!member.isActive) {
      throw new BadRequestException('Member is not active');
    }

    const plan = await this.prisma.membershipPlan.findUnique({
      where: { id: createMembershipDto.planId },
    });

    if (!plan) {
      throw new NotFoundException('Membership plan not found');
    }

    if (!plan.isActive) {
      throw new BadRequestException('Membership plan is not active');
    }

    const startDate = new Date(createMembershipDto.startDate);

    if (Number.isNaN(startDate.getTime())) {
      throw new BadRequestException('Invalid start date');
    }

    const endDate = new Date(startDate);
    endDate.setUTCDate(
      endDate.getUTCDate() + plan.durationDays,
    );

    return this.prisma.membership.create({
      data: {
        memberId: member.id,
        planId: plan.id,
        startDate,
        endDate,
        status: 'active',
      },
      include: {
        member: true,
        plan: true,
      },
    });
  }

  async update(id: number, updateMembershipDto: UpdateMembershipDto) {
    const membership = await this.findOne(id);

    const memberId =
      updateMembershipDto.memberId ?? membership.memberId;

    const planId =
      updateMembershipDto.planId ?? membership.planId;

    const startDateValue =
      updateMembershipDto.startDate ?? membership.startDate;

    const member = await this.prisma.member.findUnique({
      where: { id: memberId },
    });

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    if (!member.isActive) {
      throw new BadRequestException('Member is not active');
    }

    const plan = await this.prisma.membershipPlan.findUnique({
      where: { id: planId },
    });

    if (!plan) {
      throw new NotFoundException('Membership plan not found');
    }

    if (!plan.isActive) {
      throw new BadRequestException('Membership plan is not active');
    }

    const startDate = new Date(startDateValue);

    if (Number.isNaN(startDate.getTime())) {
      throw new BadRequestException('Invalid start date');
    }

    const endDate = new Date(startDate);
    endDate.setUTCDate(
      endDate.getUTCDate() + plan.durationDays,
    );

    return this.prisma.membership.update({
      where: { id },
      data: {
        memberId,
        planId,
        startDate,
        endDate,
      },
      include: {
        member: true,
        plan: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.membership.delete({
      where: { id },
    });

    return {
      message: 'Membership successfully deleted',
    };
  }
}
