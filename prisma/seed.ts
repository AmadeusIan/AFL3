import { PrismaClient } from "../generated/prisma/client"
import dotenv from "dotenv";
dotenv.config();


const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ================
  // 1. CUSTOMERS
  // ================
  const c1 = await prisma.customer.create({
    data: {
      name: "Budi Santoso",
      phone_number: "0811111111",
    },
  });

  const c2 = await prisma.customer.create({
    data: {
      name: "Siti Aisyah",
      phone_number: "0822222222",
    },
  });

  const c3 = await prisma.customer.create({
    data: {
      name: "Kevin Hartono",
      phone_number: "0833333333",
    },
  });

  // ================
  // 2. RESTAURANTS
  // ================
  const r1 = await prisma.restaurant.create({
    data: {
      name: "Ayam Geprek Pak Kumis",
      description: "Pedas mantap dan murah",
      status: true,
    },
  });

  const r2 = await prisma.restaurant.create({
    data: {
      name: "Bakso Mercon",
      description: "Bakso urat ekstra pedas",
      status: false,
    },
  });

  const r3 = await prisma.restaurant.create({
    data: {
      name: "Sate Taichan",
      description: "Sate gurih asin",
      status: true,
    },
  });

  // ================
  // 3. ORDERS (5 dummy)
  // ================
  const now = new Date();

  const orders = [
    { customer_id: c1.id, restaurant_id: r1.id, item_count: 3 },
    { customer_id: c2.id, restaurant_id: r2.id, item_count: 1 },
    { customer_id: c1.id, restaurant_id: r3.id, item_count: 5 },
    { customer_id: c3.id, restaurant_id: r1.id, item_count: 2 },
    { customer_id: c3.id, restaurant_id: r3.id, item_count: 4 },
  ];

  for (const o of orders) {
    await prisma.order.create({
      data: {
        customer_id: o.customer_id,
        restaurant_id: o.restaurant_id,
        item_count: o.item_count,
        order_time: now,
      },
    });
  }

  console.log("✅ Seeding selesai!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
