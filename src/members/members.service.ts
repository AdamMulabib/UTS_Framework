
import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateMemberDto } from './dto/create-member.dto.js';
import { UpdateMemberDto } from './dto/update-member.dto.js';

@Injectable()
export class MembersService {
  constructor(private readonly prisma: PrismaService) {}

  // Menampilkan semua anggota
  async findAll() {
    return this.prisma.member.findMany();
  }

  // Menampilkan anggota berdasarkan ID
  async findOne(id: number) {
    const member = await this.prisma.member.findUnique({
      where: { id },
    });

    if (!member) {
      throw new NotFoundException(
        `Member with ID ${id} not found`,
      );
    }

    return member;
  }

  // Menambahkan anggota
  async create(createMemberDto: CreateMemberDto) {
    const dateOfBirth = new Date(createMemberDto.dateOfBirth);

    if (Number.isNaN(dateOfBirth.getTime())) {
      throw new BadRequestException('Invalid date of birth');
    }

    try {
      return await this.prisma.member.create({
        data: {
          fullName: createMemberDto.fullName,
          email: createMemberDto.email,
          phoneNumber: createMemberDto.phoneNumber,
          gender: createMemberDto.gender,
          dateOfBirth,
          address: createMemberDto.address ?? null,
          isActive: true,
        },
      });
    } catch (error) {
      if (
        error instanceof Error &&
        'code' in error &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email already exists');
      }

      throw error;
    }
  }

  // Mengubah data anggota
  async update(id: number, updateMemberDto: UpdateMemberDto) {
    await this.findOne(id);

    const data = { ...updateMemberDto };

    if (data.dateOfBirth) {
      const dateOfBirth = new Date(data.dateOfBirth);

      if (Number.isNaN(dateOfBirth.getTime())) {
        throw new BadRequestException('Invalid date of birth');
      }

      data.dateOfBirth = dateOfBirth.toISOString();
    }

    try {
      return await this.prisma.member.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (
        error instanceof Error &&
        'code' in error &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email already exists');
      }

      throw error;
    }
  }

  // Menghapus anggota
  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.member.delete({
      where: { id },
    });

    return {
      message: 'Member successfully deleted',
    };
  }
}
