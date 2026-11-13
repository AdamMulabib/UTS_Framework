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

// Mengimpor MembersService untuk mengakses fungsi pengelolaan data member.
import { MembersService } from './members.service.js';

// Mengimpor DTO untuk menampung data member baru.
import { CreateMemberDto } from './dto/create-member.dto.js';

// Mengimpor DTO untuk menampung data member yang akan diperbarui.
import { UpdateMemberDto } from './dto/update-member.dto.js';

// Menentukan bahwa controller ini menangani endpoint dengan awalan /members.
@Controller('members')
export class MembersController {
  // Menghubungkan MembersService ke dalam MembersController.
  constructor(private readonly membersService: MembersService) {}

  // POST /members
  // Digunakan untuk menambahkan data member baru.
  // @Body() mengambil data yang dikirim melalui request body.
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

  // GET /members
  // Digunakan untuk mengambil seluruh data member.
  findAll() {
    return this.membersService.findAll();
  }

  // GET /members/:id
  // Digunakan untuk mengambil satu data member berdasarkan ID.
  // ParseIntPipe mengubah parameter ID menjadi angka integer.
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.membersService.findOne(id);
  }

  // PATCH /members/:id
  // Digunakan untuk memperbarui data member berdasarkan ID.
  // @Param() mengambil ID dari URL.
  // @Body() mengambil data perubahan yang dikirim melalui request body.
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    return this.membersService.update(id, updateMemberDto);
  }

  // DELETE /members/:id
  // Digunakan untuk menghapus data member berdasarkan ID.
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.membersService.remove(id);
  }
}
