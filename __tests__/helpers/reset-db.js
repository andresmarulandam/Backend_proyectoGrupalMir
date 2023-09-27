import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const resetDb = async () => {
  await prisma.$transaction([
    prisma.appointment.deleteMany(),

    prisma.doctor.deleteMany(),
    prisma.payment.deleteMany(),
    prisma.centerSpecialty.deleteMany(),
    prisma.specialty.deleteMany(),
    prisma.center.deleteMany(),
  ]);
};
