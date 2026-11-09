
import { Module } from '@nestjs/common';
import { TrainersController } from './trainers.controller.js';
import { TrainersService } from './trainers.service.js';

@Module({
  controllers: [TrainersController],
  providers: [TrainersService],
  exports: [TrainersService],
})
export class TrainersModule {}
