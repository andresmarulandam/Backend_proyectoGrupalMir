import { z } from "zod";
import escape from "validator/lib/escape.js";

export const CenterSchema = z
  .object({
    centerName: z
      .string()
      .trim()
      .max(128)
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
    locationId: z
      .string()
      .trim()
      .max(128)
      .transform(function (value) {
        return escape(value);
      }),
    enabled: z.boolean(),
  })
  .strict();

export const fields = [...Object.keys(CenterSchema.shape)];
