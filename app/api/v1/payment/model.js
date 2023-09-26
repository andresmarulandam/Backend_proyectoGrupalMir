import { z } from "zod";
import escape from "validator/lib/escape.js";

export const PaymentSchema = z
  .object({
    amount: z.number().int(),
    paymentMethod: z
      .string()
      .trim()
      .max(64)
      .transform(function (value) {
        return escape(value);
      }),
    paymentConfirmation: z.boolean(),
  })
  .strict();
export const fields = [...Object.keys(PaymentSchema.shape)];
