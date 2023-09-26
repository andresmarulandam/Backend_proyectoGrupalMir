import { z } from "zod";
import escape from "validator/lib/escape.js";

export const LocationSchema = z
  .object({
    country: z
      .string()
      .trim()
      .max(64)
      .transform(function (value) {
        return escape(value);
      }),
    city: z
      .string()
      .trim()
      .max(64)
      .transform(function (value) {
        return escape(value);
      }),
    address: z
      .string()
      .trim()
      .max(128)
      .transform(function (value) {
        return escape(value);
      }),
  })
  .strict();

export const fields = [...Object.keys(LocationSchema.shape)];
