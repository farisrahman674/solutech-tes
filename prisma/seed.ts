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

  // PRODUCTS
  const products = [
    {
      name: "MacBook Air M3",
      description: "Laptop Apple M3 13 inch",
      price: 18999000,
      stock: 10,
    },
    {
      name: "iPhone 16 Pro",
      description: "Apple flagship smartphone",
      price: 20999000,
      stock: 15,
    },
    {
      name: "Samsung Galaxy S25",
      description: "Samsung Android flagship",
      price: 17999000,
      stock: 12,
    },
    {
      name: "Sony WH-1000XM5",
      description: "Wireless noise cancelling headphone",
      price: 5499000,
      stock: 20,
    },
    {
      name: "iPad Air M2",
      description: "Apple tablet with M2 chip",
      price: 11999000,
      stock: 8,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: {
        name: product.name,
      },
      update: {},
      create: product,
    });
  }

  console.log("✅ Products seeded");
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
