
# Gym Management System API

REST API untuk mengelola anggota gym, pelatih, paket keanggotaan, langganan, jadwal latihan, dan peserta sesi latihan.

Project ini dibangun menggunakan **NestJS, TypeScript, Prisma, dan PostgreSQL**.

## 1. Teknologi yang Digunakan

- **NestJS** — Framework backend berbasis Node.js.
- **TypeScript** — Bahasa pemrograman yang digunakan.
- **Prisma ORM** — Menghubungkan aplikasi dengan database.
- **PostgreSQL** — Database untuk menyimpan data.
- **Docker** — Menjalankan PostgreSQL dalam container.
- **Thunder Client** — Menguji REST API melalui VS Code.

## 2. Cara Menjalankan Project

### Prasyarat

Pastikan sudah menginstal:

- Node.js dan npm yang kompatibel
- Docker Desktop
- Git
- Visual Studio Code

### Clone Repository

```bash
git clone https://github.com/AdamMulabib/UTS_Framework.git
cd UTS_Framework
```

### Install Dependency

```bash
npm ci
```

### Konfigurasi Database

Buat file `.env` pada folder utama project.

```env
DATABASE_URL="postgresql://gym_admin:gym_password123@localhost:5432/gym_management?schema=public"
```

Konfigurasi tersebut digunakan untuk database PostgreSQL lokal sesuai konfigurasi Docker project.

**Catatan:** File `.env` tidak boleh diunggah ke GitHub karena berisi informasi koneksi database.

### Jalankan PostgreSQL

Pastikan Docker Desktop aktif, kemudian jalankan:

```bash
docker compose up -d
```

### Generate Prisma Client

```bash
npx prisma generate
```

### Jalankan Migrasi Database

```bash
npx prisma migrate deploy
```

### Jalankan Server NestJS

```bash
npm run start:dev
```

Jika berhasil, terminal akan menampilkan:

```text
Nest application successfully started
```

Base URL API:

```text
http://localhost:3000
```

## 3. Modul Aplikasi

Gym Management System memiliki enam modul utama.

| No | Modul | Fungsi |
|---|---|---|
| 1 | Members | Mengelola data anggota gym |
| 2 | Trainers | Mengelola data pelatih gym |
| 3 | Membership Plans | Mengelola paket keanggotaan |
| 4 | Memberships | Mengelola langganan anggota |
| 5 | Training Sessions | Mengelola jadwal latihan |
| 6 | Session Participants | Mengelola peserta sesi latihan |

Setiap modul memiliki operasi CRUD, yaitu Create, Read, Update, dan Delete.

## 4. Struktur Database

Database didefinisikan dalam file `prisma/schema.prisma`.

### Relasi Database

```text
Member
  |
  |--- Membership --- MembershipPlan
  |
  |--- SessionParticipant --- TrainingSession --- Trainer
```

Penjelasan relasi:

- Satu Member dapat memiliki beberapa Membership.
- Satu MembershipPlan dapat digunakan oleh beberapa Membership.
- Satu Trainer dapat memimpin beberapa TrainingSession.
- Satu TrainingSession dapat memiliki beberapa SessionParticipant.
- Satu Member dapat mengikuti beberapa TrainingSession.

Kombinasi `sessionId` dan `memberId` pada SessionParticipant bersifat unik.

### Tabel Member

| Field | Tipe Data | Keterangan |
|---|---|---|
| id | Int | Primary key, memiliki nilai default |
| fullName | String | Nama lengkap anggota |
| email | String | Email unik anggota |
| phoneNumber | String | Nomor telepon |
| gender | String | Jenis kelamin |
| dateOfBirth | DateTime | Tanggal lahir |
| address | String? | Alamat, opsional |
| isActive | Boolean | Status keaktifan |

### Tabel Trainer

| Field | Tipe Data | Keterangan |
|---|---|---|
| id | Int | Primary key |
| fullName | String | Nama pelatih |
| email | String | Email unik pelatih |
| phoneNumber | String | Nomor telepon |
| specialization | String | Spesialisasi pelatih |
| experienceYears | Int | Lama pengalaman |
| isActive | Boolean | Status keaktifan |

### Tabel MembershipPlan

| Field | Tipe Data | Keterangan |
|---|---|---|
| id | Int | Primary key |
| name | String | Nama paket |
| description | String? | Deskripsi paket |
| price | Float | Harga paket |
| durationDays | Int | Durasi dalam hari |
| isActive | Boolean | Status paket |

### Tabel Membership

| Field | Tipe Data | Keterangan |
|---|---|---|
| id | Int | Primary key |
| memberId | Int | ID anggota |
| planId | Int | ID paket |
| startDate | DateTime | Tanggal mulai |
| endDate | DateTime | Tanggal berakhir |
| status | String | Status membership |

### Tabel TrainingSession

| Field | Tipe Data | Keterangan |
|---|---|---|
| id | Int | Primary key |
| trainerId | Int | ID pelatih |
| sessionName | String | Nama sesi |
| description | String? | Deskripsi sesi |
| sessionDate | DateTime | Tanggal latihan |
| startTime | String | Jam mulai |
| endTime | String | Jam selesai |
| capacity | Int | Kapasitas peserta |
| status | String | Status sesi |

### Tabel SessionParticipant

| Field | Tipe Data | Keterangan |
|---|---|---|
| id | Int | Primary key |
| sessionId | Int | ID sesi latihan |
| memberId | Int | ID anggota |
| registrationDate | DateTime | Tanggal pendaftaran |
| registrationStatus | String | Status pendaftaran |

## 5. API Endpoints

Base URL:

```text
http://localhost:3000
```

### A. Members

Digunakan untuk mengelola data anggota gym.

| Method | Endpoint | Keterangan |
|---|---|---|
| POST | /members | Menambahkan anggota |
| GET | /members | Menampilkan semua anggota |
| GET | /members/:id | Menampilkan anggota berdasarkan ID |
| PATCH | /members/:id | Memperbarui data anggota |
| DELETE | /members/:id | Menghapus anggota |

Contoh request:

**POST /members**

```json
{
  "fullName": "Andi Saputra",
  "email": "andi@example.com",
  "phoneNumber": "081234567890",
  "gender": "male",
  "dateOfBirth": "2003-04-15",
  "address": "Medan"
}
```

### B. Trainers

Digunakan untuk mengelola data pelatih gym.

| Method | Endpoint | Keterangan |
|---|---|---|
| POST | /trainers | Menambahkan pelatih |
| GET | /trainers | Menampilkan semua pelatih |
| GET | /trainers/:id | Menampilkan pelatih berdasarkan ID |
| PATCH | /trainers/:id | Memperbarui data pelatih |
| DELETE | /trainers/:id | Menghapus pelatih |

Contoh request:

**POST /trainers**

```json
{
  "fullName": "Budi Hartono",
  "email": "budi@example.com",
  "phoneNumber": "081234567899",
  "specialization": "Strength Training",
  "experienceYears": 5
}
```

### C. Membership Plans

Digunakan untuk mengelola jenis paket keanggotaan gym.

| Method | Endpoint | Keterangan |
|---|---|---|
| POST | /membership-plans | Menambahkan paket |
| GET | /membership-plans | Menampilkan semua paket |
| GET | /membership-plans/:id | Menampilkan paket berdasarkan ID |
| PATCH | /membership-plans/:id | Memperbarui paket |
| DELETE | /membership-plans/:id | Menghapus paket |

Contoh request:

**POST /membership-plans**

```json
{
  "name": "Gold Membership",
  "description": "Akses gym selama 30 hari",
  "price": 350000,
  "durationDays": 30
}
```

### D. Memberships

Digunakan untuk mengelola langganan keanggotaan gym.

| Method | Endpoint | Keterangan |
|---|---|---|
| POST | /memberships | Menambahkan membership |
| GET | /memberships | Menampilkan semua membership |
| GET | /memberships/:id | Menampilkan membership berdasarkan ID |
| PATCH | /memberships/:id | Memperbarui membership |
| DELETE | /memberships/:id | Menghapus membership |

Contoh request:

**POST /memberships**

```json
{
  "memberId": 1,
  "planId": 1,
  "startDate": "2026-11-17"
}
```

`memberId` dan `planId` harus mengacu pada data anggota dan paket yang sudah tersimpan.

### E. Training Sessions

Digunakan untuk mengelola jadwal dan sesi latihan.

| Method | Endpoint | Keterangan |
|---|---|---|
| POST | /training-sessions | Menambahkan sesi latihan |
| GET | /training-sessions | Menampilkan semua sesi |
| GET | /training-sessions/:id | Menampilkan sesi berdasarkan ID |
| PATCH | /training-sessions/:id | Memperbarui sesi latihan |
| DELETE | /training-sessions/:id | Menghapus sesi latihan |

Contoh request:

**POST /training-sessions**

```json
{
  "trainerId": 1,
  "sessionName": "Morning Yoga",
  "description": "Sesi yoga pemula",
  "sessionDate": "2026-11-20",
  "startTime": "08:00",
  "endTime": "09:00",
  "capacity": 15
}
```

`trainerId` harus mengacu pada pelatih yang sudah terdaftar.

### F. Session Participants

Digunakan untuk mengelola anggota yang mendaftar ke sesi latihan.

| Method | Endpoint | Keterangan |
|---|---|---|
| POST | /session-participants | Menambahkan peserta |
| GET | /session-participants | Menampilkan semua peserta |
| GET | /session-participants/:id | Menampilkan peserta berdasarkan ID |
| PATCH | /session-participants/:id | Memperbarui peserta |
| DELETE | /session-participants/:id | Menghapus peserta |

Contoh request:

**POST /session-participants**

```json
{
  "sessionId": 1,
  "memberId": 1,
  "registrationDate": "2026-11-17"
}
```

`sessionId` dan `memberId` harus mengacu pada data yang sudah tersimpan.

## 6. Pengujian API Menggunakan Thunder Client

Pengujian API dapat dilakukan menggunakan ekstensi Thunder Client di Visual Studio Code.

### Langkah Pengujian

1. Jalankan PostgreSQL dan server NestJS.
2. Buka Thunder Client di VS Code.
3. Pilih New Request.
4. Pilih metode HTTP.
5. Masukkan URL endpoint.
6. Untuk POST atau PATCH, pilih Body → JSON.
7. Masukkan data yang sesuai.
8. Klik Send.
9. Periksa status HTTP dan respons JSON.

### Metode HTTP

| Method | Fungsi |
|---|---|
| GET | Mengambil data |
| POST | Menambahkan data baru |
| PATCH | Mengubah data |
| DELETE | Menghapus data |

### Contoh Pengujian

**GET semua anggota**

```http
GET http://localhost:3000/members
```

**POST menambahkan anggota**

```http
POST http://localhost:3000/members
```

**GET berdasarkan ID**

```http
GET http://localhost:3000/members/1
```

**PATCH memperbarui anggota**

```http
PATCH http://localhost:3000/members/1
```

Contoh Body:

```json
{
  "fullName": "Andi Saputra Updated"
}
```

**DELETE anggota**

```http
DELETE http://localhost:3000/members/1
```

ID pada contoh harus disesuaikan dengan ID data sebenarnya.

## 7. Struktur Folder Project

```text
UTS_Framework/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── members/
│   ├── trainers/
│   ├── membership-plans/
│   ├── memberships/
│   ├── training-sessions/
│   ├── session-participants/
│   ├── prisma/
│   ├── app.module.ts
│   └── main.ts
├── test/
├── docker-compose.yml
├── package.json
├── prisma.config.ts
└── README.md
```

### Penjelasan File

**main.ts**

Merupakan file utama yang digunakan untuk menjalankan aplikasi NestJS.

**app.module.ts**

Digunakan untuk menggabungkan modul-modul aplikasi.

**controller.ts**

Bertugas menerima request HTTP dari pengguna dan meneruskannya ke service.

**service.ts**

Berisi logika aplikasi dan proses pengolahan data melalui Prisma.

**dto.ts**

Digunakan untuk menentukan struktur serta validasi data yang diterima aplikasi.

**module.ts**

Digunakan untuk mendaftarkan controller dan service dalam satu modul.

**schema.prisma**

Berisi model database, tipe data, serta relasi antar tabel.

## 8. Status Implementasi dan Pengujian

Berdasarkan log pengujian tanggal 17 November 2026:

| Komponen | Status |
|---|---|
| Kompilasi TypeScript | Berhasil, 0 error |
| Inisialisasi modul NestJS | Berhasil |
| Pendaftaran 30 route API | Berhasil |
| Generate Prisma Client | Berhasil |
| Koneksi PostgreSQL | Belum berhasil |
| Startup aplikasi secara penuh | Belum berhasil |
| Pengujian CRUD melalui HTTP | Belum terverifikasi |

Aplikasi telah berhasil mengompilasi kode dan mendaftarkan seluruh route API.

Namun, saat dijalankan, Prisma mengalami error:

```text
PrismaClientInitializationError:
Can't reach database server at localhost:5432

Error Code: P1001
```

Hal tersebut menunjukkan database PostgreSQL belum dapat dijangkau.

Dengan demikian, endpoint API telah terdaftar pada aplikasi, tetapi belum seluruhnya berhasil diuji melalui Thunder Client.

## 9. Git dan GitHub

Repository:

https://github.com/AdamMulabib/UTS_Framework

Contoh perintah untuk mengirim perubahan melalui branch sendiri:

```bash
git switch komentar-inays
git status
git add README.md
git commit -m "Menambahkan dokumentasi README Gym Management API"
git push origin komentar-inays
```

Perubahan pada branch dapat diajukan melalui Pull Request agar dapat diperiksa dan digabungkan ke branch `main`.

## 10. Kesimpulan

Gym Management System merupakan aplikasi backend berbasis REST API yang dikembangkan menggunakan NestJS, TypeScript, Prisma ORM, dan PostgreSQL.

Aplikasi ini menyediakan enam modul utama untuk pengelolaan anggota, pelatih, paket keanggotaan, langganan, sesi latihan, serta peserta sesi latihan.

Masing-masing modul memiliki lima endpoint untuk mendukung operasi CRUD.

Berdasarkan log aplikasi, seluruh 30 endpoint telah berhasil didaftarkan oleh NestJS. Pengujian fungsional endpoint masih memerlukan database PostgreSQL yang dapat diakses agar proses penyimpanan, pengambilan, perubahan, dan penghapusan data dapat diverifikasi.

## 11. Panduan Pengujian Endpoint

Sebelum melakukan pengujian API, pastikan server NestJS dan database PostgreSQL sudah berjalan.

Urutan pengujian yang disarankan:

1. GET untuk menampilkan seluruh data.
2. POST untuk menambahkan data baru.
3. GET berdasarkan ID untuk memeriksa data.
4. PATCH untuk memperbarui data.
5. DELETE untuk menghapus data.

Pengujian dapat dilakukan menggunakan Thunder Client pada Visual Studio Code.

Catatan: Pengujian CRUD membutuhkan koneksi database PostgreSQL yang aktif.
