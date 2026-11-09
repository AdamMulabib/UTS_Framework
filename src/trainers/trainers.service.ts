
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateTrainerDto } from './dto/create-trainer.dto.js';
import { UpdateTrainerDto } from './dto/update-trainer.dto.js';

@Injectable()
export class TrainersService {
  constructor(private readonly prisma: PrismaService) {}

  // Menampilkan semua pelatih
  async findAll() {
    return this.prisma.trainer.findMany();
  }

  // Menampilkan pelatih berdasarkan ID
  async findOne(id: number) {
    const trainer = await this.prisma.trainer.findUnique({
      where: { id },
    });

    if (!trainer) {
      throw new NotFoundException(
        `Trainer with ID ${id} not found`,
      );
    }

    return trainer;
  }

  // Menambahkan pelatih
  async create(createTrainerDto: CreateTrainerDto) {
    try {
      return await this.prisma.trainer.create({
        data: {
          fullName: createTrainerDto.fullName,
          email: createTrainerDto.email,
          phoneNumber: createTrainerDto.phoneNumber,
          specialization: createTrainerDto.specialization,
          experienceYears: createTrainerDto.experienceYears,
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

  // Mengubah data pelatih
  async update(id: number, updateTrainerDto: UpdateTrainerDto) {
    await this.findOne(id);

    try {
      return await this.prisma.trainer.update({
        where: { id },
        data: updateTrainerDto,
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

  // Menghapus pelatih
  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.trainer.delete({
      where: { id },
    });

    return {
      message: 'Trainer successfully deleted',
    };
  }
}
