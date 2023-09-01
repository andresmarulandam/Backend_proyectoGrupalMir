import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const connect = async function () {
  try {
    await prisma.$connect();
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export const disconnect = async function () {
  await prisma.$disconnect();
  console.log("Database disconnected");
};
