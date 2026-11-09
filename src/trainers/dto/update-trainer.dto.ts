
import { PartialType } from '@nestjs/mapped-types';
import { CreateTrainerDto } from './create-trainer.dto.js';

export class UpdateTrainerDto extends PartialType(CreateTrainerDto) {}
