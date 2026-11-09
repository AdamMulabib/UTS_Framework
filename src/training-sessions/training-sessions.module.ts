import { Module } from '@nestjs/common';

import { TrainingSessionsController } from './training-sessions.controller.js';
import { TrainingSessionsService } from './training-sessions.service.js';

import { TrainersModule } from '../trainers/trainers.module.js';

@Module({
  imports: [TrainersModule],
  controllers: [TrainingSessionsController],
  providers: [TrainingSessionsService],
  exports: [TrainingSessionsService],
})
export class TrainingSessionsModule {}