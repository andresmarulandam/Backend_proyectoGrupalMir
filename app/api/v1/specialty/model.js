import { z } from "zod";
import escape from "validator/lib/escape.js";

export const SpecialtySchema = z
  .object({
    name: z
      .string()
      .trim()
      .max(64)
      .transform(function (value) {
        return escape(value);
      }),
    description: z
      .string()
      .trim()
      .max(256)
      .transform(function (value) {
        return escape(value);
      }),
    enabled: z.boolean(),
  })
  .strict();
export const fields = [...Object.keys(SpecialtySchema.shape)];
