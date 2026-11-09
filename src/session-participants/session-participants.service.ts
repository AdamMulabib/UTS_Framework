
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateSessionParticipantDto } from './dto/create-session-participant.dto.js';
import { UpdateSessionParticipantDto } from './dto/update-session-participant.dto.js';

@Injectable()
export class SessionParticipantsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.sessionParticipant.findMany({
      include: {
        member: true,
        session: true,
      },
    });
  }

  async findOne(id: number) {
    const participant = await this.prisma.sessionParticipant.findUnique({
      where: { id },
      include: {
        member: true,
        session: true,
      },
    });

    if (!participant) {
      throw new NotFoundException(
        `Session participant with ID ${id} not found`,
      );
    }

    return participant;
  }

  async create(createDto: CreateSessionParticipantDto) {
    const member = await this.prisma.member.findUnique({
      where: { id: createDto.memberId },
    });

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    if (!member.isActive) {
      throw new BadRequestException('Member is not active');
    }

    const session = await this.prisma.trainingSession.findUnique({
      where: { id: createDto.sessionId },
    });

    if (!session) {
      throw new NotFoundException('Training session not found');
    }

    if (session.status !== 'scheduled') {
      throw new BadRequestException(
        'Training session is not available',
      );
    }

    const duplicate = await this.prisma.sessionParticipant.findFirst({
      where: {
        memberId: createDto.memberId,
        sessionId: createDto.sessionId,
        registrationStatus: {
          not: 'cancelled',
        },
      },
    });

    if (duplicate) {
      throw new ConflictException(
        'Member is already registered in this session',
      );
    }

    const participantCount =
      await this.prisma.sessionParticipant.count({
        where: {
          sessionId: createDto.sessionId,
          registrationStatus: {
            not: 'cancelled',
          },
        },
      });

    if (participantCount >= session.capacity) {
      throw new BadRequestException(
        'Training session is full',
      );
    }

    const registrationDate = createDto.registrationDate
      ? new Date(createDto.registrationDate)
      : new Date();

    if (Number.isNaN(registrationDate.getTime())) {
      throw new BadRequestException(
        'Invalid registration date',
      );
    }

    return this.prisma.sessionParticipant.create({
      data: {
        sessionId: createDto.sessionId,
        memberId: createDto.memberId,
        registrationDate,
        registrationStatus: 'registered',
      },
      include: {
        member: true,
        session: true,
      },
    });
  }

  async update(id: number, updateDto: UpdateSessionParticipantDto) {
    await this.findOne(id);

    const data = { ...updateDto };

    if (updateDto.registrationDate !== undefined) {
      const registrationDate = new Date(
        updateDto.registrationDate,
      );

      if (Number.isNaN(registrationDate.getTime())) {
        throw new BadRequestException(
          'Invalid registration date',
        );
      }

      data.registrationDate = registrationDate.toISOString();
    }

    return this.prisma.sessionParticipant.update({
      where: { id },
      data,
      include: {
        member: true,
        session: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.sessionParticipant.delete({
      where: { id },
    });

    return {
      message: 'Session participant successfully deleted',
    };
  }
}
