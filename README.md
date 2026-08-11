# Solutech Technical Test - Backend Developer

Backend API sederhana untuk modul e-commerce menggunakan Next.js, Prisma, dan PostgreSQL.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Prisma ORM
- PostgreSQL (Supabase PostgreSQL)
- JWT Authentication
- Zod Validation

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
- HTTP Status Code sesuai kebutuhan (200, 201, 400, 401, 403, 404, 500)

### Bonus

- Frontend sederhana untuk Admin CRUD Product
- Frontend sederhana untuk User Product & My Orders

---

## Database

Project ini menggunakan PostgreSQL lokal (Seperti pgAdmin4) selama nilai `DATABASE_URL` disesuaikan.

---

## Environment Variables

Buat file `.env`

```env
DATABASE_URL="postgresql://postgres:<Password>@localhost:5432/<nama database>"
JWT_SECRET="super-secret-key"
NODE_ENV=production
```

Keterangan:

- DATABASE_URL : PostgreSQL Connection String
- JWT_SECRET : Secret Key untuk JWT Authentication

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

## Database Setup

### Harus mempunyai aplikasi mendukung PostgreSQL Local seperti pgAdmin4 dan membuat database nya

### Untuk tabel tinggal melakukan migrate karena sudah otomatis membuat tabel

Generate Prisma Client

```bash
npx prisma generate
```

Jalankan Migration

```bash
npx prisma migrate deploy
```

atau

```bash
npx prisma migrate dev
```

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

note: database sudah terbentuk dari migrate database

---

## Postman Collection

Postman Collection tersedia pada:

```txt
/Solutech.postman_collection.json
```

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
