import { Module } from '@nestjs/common'; // Mengimpor Module untuk mendefinisikan sebuah module di NestJS.

import { TrainingSessionsController } from './training-sessions.controller.js'; // Mengimpor controller yang menangani request terkait training sessions.
import { TrainingSessionsService } from './training-sessions.service.js'; // Mengimpor service yang berisi logika bisnis training sessions.

import { TrainersModule } from '../trainers/trainers.module.js'; // Mengimpor TrainersModule agar fitur atau service dari module Trainers dapat digunakan.

@Module({ // Decorator untuk mengatur konfigurasi TrainingSessionsModule.
  imports: [TrainersModule], // Menghubungkan TrainersModule agar provider yang diekspor dapat digunakan di module ini.
  controllers: [TrainingSessionsController], // Mendaftarkan controller untuk menangani endpoint training sessions.
  providers: [TrainingSessionsService], // Mendaftarkan TrainingSessionsService sebagai penyedia layanan.
  exports: [TrainingSessionsService], // Mengekspor service agar dapat digunakan oleh module lain.
})
export class TrainingSessionsModule {} // Mendefinisikan TrainingSessionsModule sebagai module untuk mengelola fitur training sessions.