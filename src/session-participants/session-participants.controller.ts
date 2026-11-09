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

import { SessionParticipantsService } from './session-participants.service.js';
import { CreateSessionParticipantDto } from './dto/create-session-participant.dto.js';
import { UpdateSessionParticipantDto } from './dto/update-session-participant.dto.js';

@Controller('session-participants')
export class SessionParticipantsController {
  constructor(
    private readonly sessionParticipantsService: SessionParticipantsService,
  ) {}

  @Post()
  create(@Body() createDto: CreateSessionParticipantDto) {
    return this.sessionParticipantsService.create(createDto);
  }

  @Get()
  findAll() {
    return this.sessionParticipantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sessionParticipantsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateSessionParticipantDto,
  ) {
    return this.sessionParticipantsService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sessionParticipantsService.remove(id);
  }
}