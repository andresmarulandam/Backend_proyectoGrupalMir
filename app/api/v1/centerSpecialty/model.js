import { z } from "zod";
import escape from "validator/lib/escape.js";

export const CenterSpecialtySchema = z
  .object({
    centerId: z
      .string()
      .trim()
      .max(128)
      .transform(function (value) {
        return escape(value);
      }),
    specialtyId: z
      .string()
      .trim()
      .max(128)
      .transform(function (value) {
        return escape(value);
      }),
  })
  .strict();
export const fields = [...Object.keys(CenterSpecialtySchema.shape)];
