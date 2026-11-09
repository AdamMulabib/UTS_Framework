import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { TrainingSessionsService } from './training-sessions.service.js';
import { CreateTrainingSessionDto } from './dto/create-training-session.dto.js';
import { UpdateTrainingSessionDto } from './dto/update-training-session.dto.js';

@Controller('training-sessions')
export class TrainingSessionsController {
  constructor(
    private readonly trainingSessionsService: TrainingSessionsService,
  ) {}

  @Post()
  create(@Body() createDto: CreateTrainingSessionDto) {
    return this.trainingSessionsService.create(createDto);
  }

  @Get()
  findAll() {
    return this.trainingSessionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.trainingSessionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateTrainingSessionDto,
  ) {
    return this.trainingSessionsService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.trainingSessionsService.remove(id);
  }
}