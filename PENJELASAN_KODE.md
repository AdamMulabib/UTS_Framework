
# Penjelasan Kode UTS Framework

## CreateMemberDto

File CreateMemberDto digunakan untuk memvalidasi data
member baru sebelum diproses oleh sistem.

### Penjelasan Validasi

- IsString: Memastikan data berupa teks.
- IsNotEmpty: Memastikan data tidak kosong.
- IsEmail: Memvalidasi format email.
- IsIn: Membatasi pilihan jenis kelamin.
- IsDateString: Memvalidasi format tanggal lahir.
- IsOptional: Menandakan data boleh tidak diisi.

## Tujuan Dokumentasi

Dokumentasi ini dibuat untuk mempermudah pemahaman
terhadap fungsi kode dalam project UTS Framework.
