import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const userPassword = await bcrypt.hash("user123", 10);
  // ADMIN
  await prisma.user.upsert({
    where: {
      email: "admin@solutech.com",
    },
    update: {},
    create: {
      name: "Administrator",
      email: "admin@solutech.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  // USER
  await prisma.user.upsert({
    where: {
      email: "user@solutech.com",
    },
    update: {},
    create: {
      name: "Normal User",
      email: "user@solutech.com",
      password: userPassword,
      role: "USER",
    },
  });

  console.log("✅ Admin seeded");
  console.log("✅ User seeded");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
