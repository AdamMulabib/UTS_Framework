
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateTrainingSessionDto } from './dto/create-training-session.dto.js';
import { UpdateTrainingSessionDto } from './dto/update-training-session.dto.js';

@Injectable()
export class TrainingSessionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.trainingSession.findMany({
      include: {
        trainer: true,
      },
    });
  }

  async findOne(id: number) {
    const session = await this.prisma.trainingSession.findUnique({
      where: { id },
      include: {
        trainer: true,
      },
    });

    if (!session) {
      throw new NotFoundException(
        `Training session with ID ${id} not found`,
      );
    }

    return session;
  }

  async create(createDto: CreateTrainingSessionDto) {
    const trainer = await this.prisma.trainer.findUnique({
      where: { id: createDto.trainerId },
    });

    if (!trainer) {
      throw new NotFoundException('Trainer not found');
    }

    if (!trainer.isActive) {
      throw new BadRequestException('Trainer is not active');
    }

    if (createDto.startTime >= createDto.endTime) {
      throw new BadRequestException(
        'End time must be later than start time',
      );
    }

    const sessionDate = new Date(createDto.sessionDate);

    if (Number.isNaN(sessionDate.getTime())) {
      throw new BadRequestException('Invalid session date');
    }

    return this.prisma.trainingSession.create({
      data: {
        trainerId: createDto.trainerId,
        sessionName: createDto.sessionName,
        description: createDto.description ?? null,
        sessionDate,
        startTime: createDto.startTime,
        endTime: createDto.endTime,
        capacity: createDto.capacity,
        status: 'scheduled',
      },
      include: {
        trainer: true,
      },
    });
  }

  async update(id: number, updateDto: UpdateTrainingSessionDto) {
    const session = await this.findOne(id);

    const newStartTime =
      updateDto.startTime ?? session.startTime;

    const newEndTime =
      updateDto.endTime ?? session.endTime;

    if (newStartTime >= newEndTime) {
      throw new BadRequestException(
        'End time must be later than start time',
      );
    }

    if (updateDto.trainerId !== undefined) {
      const trainer = await this.prisma.trainer.findUnique({
        where: { id: updateDto.trainerId },
      });

      if (!trainer) {
        throw new NotFoundException('Trainer not found');
      }

      if (!trainer.isActive) {
        throw new BadRequestException('Trainer is not active');
      }
    }

    const data = { ...updateDto };

    if (updateDto.sessionDate !== undefined) {
      const sessionDate = new Date(updateDto.sessionDate);

      if (Number.isNaN(sessionDate.getTime())) {
        throw new BadRequestException('Invalid session date');
      }

      data.sessionDate = sessionDate.toISOString();
    }

    return this.prisma.trainingSession.update({
      where: { id },
      data,
      include: {
        trainer: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.trainingSession.delete({
      where: { id },
    });

    return {
      message: 'Training session successfully deleted',
    };
  }
}
