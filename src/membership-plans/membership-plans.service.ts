
import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateMembershipPlanDto } from './dto/create-membership-plan.dto.js';
import { UpdateMembershipPlanDto } from './dto/update-membership-plan.dto.js';

@Injectable()
export class MembershipPlansService {
  constructor(private readonly prisma: PrismaService) {}

  // Menampilkan semua paket keanggotaan
  async findAll() {
    return this.prisma.membershipPlan.findMany();
  }

  // Menampilkan paket berdasarkan ID
  async findOne(id: number) {
    const plan = await this.prisma.membershipPlan.findUnique({
      where: { id },
    });

    if (!plan) {
      throw new NotFoundException(
        `Membership plan with ID ${id} not found`,
      );
    }

    return plan;
  }

  // Menambahkan paket keanggotaan
  async create(createMembershipPlanDto: CreateMembershipPlanDto) {
    return this.prisma.membershipPlan.create({
      data: {
        name: createMembershipPlanDto.name,
        description: createMembershipPlanDto.description ?? null,
        price: createMembershipPlanDto.price,
        durationDays: createMembershipPlanDto.durationDays,
        isActive: true,
      },
    });
  }

  // Mengubah paket keanggotaan
  async update(
    id: number,
    updateMembershipPlanDto: UpdateMembershipPlanDto,
  ) {
    await this.findOne(id);

    return this.prisma.membershipPlan.update({
      where: { id },
      data: updateMembershipPlanDto,
    });
  }

  // Menghapus paket keanggotaan
  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.membershipPlan.delete({
      where: { id },
    });

    return {
      message: 'Membership plan successfully deleted',
    };
  }
}
