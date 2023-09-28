import { prisma } from "../app/database.js";
import { getPayment } from "./fixtures/payment.fixture.js";

export const setup = async () => {
  const paymentDataArray = [getPayment({}), getPayment({}), getPayment({})];

  try {
    await prisma.payment.createMany({
      data: paymentDataArray,
    });

    console.log("Pagos creados exitosamente.");
  } catch (error) {
    console.error("Error al crear pagos:", error);
  }
};
