import { z } from "zod";
import escape from "validator/lib/escape.js";

export const DoctorSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .max(128)
      .transform(function (value) {
        return escape(value);
      }),
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
    enabled: z.boolean(),
    favorite: z.boolean(),
  })
  .strict();

export const fields = [...Object.keys(DoctorSchema.shape)];
