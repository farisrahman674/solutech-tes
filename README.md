# Solutech Technical Test - Backend Developer

Backend API sederhana untuk modul e-commerce menggunakan Next.js, Prisma, dan PostgreSQL.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Zod Validation

---

## Requirements

Pastikan sudah terinstall:

- Node.js 20+
- npm
- PostgreSQL
- Git (jika menggunakan Clone Repository)

Recommended:

- VS Code
- pgAdmin4

---

## Features

### Authentication

- Login menggunakan JWT
- JWT disimpan pada httpOnly Cookie
- Protected Route menggunakan Middleware
- Role Based Access (ADMIN & USER)

### Product

- Create Product
- Get All Product
- Get Product Detail
- Update Product
- Soft Delete Product
- Search Product
- Pagination Product

### Order

- Create Order
- Update Stock otomatis saat Order berhasil
- Perhitungan Total Price otomatis
- Menampilkan daftar Order milik User yang sedang login

### Validation & Error Handling

- Validasi input menggunakan Zod
- Consistent Error Response
- HTTP Status Code sesuai kebutuhan

### Bonus

- Frontend sederhana untuk Admin CRUD Product
- Frontend sederhana untuk User Product & My Orders

---

## Installation

### Option 1 - Clone Repository

```bash
git clone https://github.com/farisrahman674/solutech-tes.git
cd solutech-tes
npm install
```

### Option 2 - Download ZIP

1. Buka repository GitHub https://github.com/farisrahman674/solutech-tes.git
2. Klik **Code**
3. Klik **Download ZIP**
4. Extract file ZIP
5. Buka folder hasil extract menggunakan VS Code
6. Jalankan command:

```bash
npm install
```

---

## Environment Variables

Buat file `.env`

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/solutech"
JWT_SECRET="super-secret-key"
NODE_ENV=development
```

Keterangan:

- DATABASE_URL: PostgreSQL connection string untuk database lokal. Sesuaikan username, password, host, port, dan nama database dengan konfigurasi PostgreSQL lokal Anda.

Format umum:

```
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<nama-database>"
```

- JWT_SECRET: Secret key yang digunakan untuk JWT Authentication. Dapat diganti dengan nilai secret lain yang lebih aman.
- NODE_ENV: Menentukan environment aplikasi. Gunakan `development` untuk menjalankan project secara lokal.

---

## Database Setup

Project ini menggunakan PostgreSQL lokal.

Pastikan:

- PostgreSQL sudah terinstall dan sedang berjalan
- Database sudah dibuat
- Konfigurasi `DATABASE_URL` sudah sesuai

Anda dapat menggunakan pgAdmin4 untuk membuat dan mengelola database.

Generate Prisma Client

```bash
npx prisma generate
```

Jalankan Migration

```bash
npx prisma migrate dev
```

Migration akan otomatis membuat tabel yang dibutuhkan.

---

## Seed Database

```bash
npx prisma db seed
```

Menambahkan data awal:

- 1 Admin
- 2 User
- Beberapa Product

---

## Run Project

Development

```bash
npm run dev
```

Project akan berjalan di:

```txt
http://localhost:3000
```

---

## Default Account

### Admin

```txt
email: admin@solutech.com
password: admin123
```

### User

```txt
email: user@solutech.com
password: user123
```

```txt
email: user2@solutech.com
password: user123
```

---

## SQL File

File SQL create table tersedia pada:

```txt
/database.sql
```

> Tidak perlu menjalankan file `database.sql` secara manual.
> Struktur database akan dibuat otomatis melalui Prisma Migration.

---

## Postman Collection

Postman Collection tersedia pada:

```txt
/Solutech.json
```

Import file `Solutech.json` ke Postman untuk mencoba API.

Berisi:

- Authentication
- Product CRUD
- Order
- Protected Endpoint Example

### Authentication

| Method | Endpoint        | Access |
| ------ | --------------- | ------ |
| POST   | /api/auth/login | Public |

### Product

| Method | Endpoint                      | Access       |
| ------ | ----------------------------- | ------------ |
| GET    | /api/products                 | User / Admin |
| GET    | /api/products?page=1&limit=10 | User / Admin |
| GET    | /api/products?search=iphone   | User / Admin |
| GET    | /api/products/:id             | User / Admin |
| POST   | /api/products                 | Admin        |
| PUT    | /api/products/:id             | Admin        |
| DELETE | /api/products/:id             | Admin        |

### Order

| Method | Endpoint   | Access |
| ------ | ---------- | ------ |
| POST   | /api/order | User   |
| GET    | /api/order | User   |

## Assumptions & Technical Decisions

- Soft Delete menggunakan field `isDeleted`
- Product yang sudah dihapus tidak tampil pada User
- Product yang sudah dihapus tetap dapat dilihat oleh Admin
- JWT disimpan pada httpOnly Cookie untuk meningkatkan keamanan
- Order dan pengurangan stock dijalankan dalam satu database transaction untuk menjaga konsistensi data

## Author

Faris Rahman Shalih
