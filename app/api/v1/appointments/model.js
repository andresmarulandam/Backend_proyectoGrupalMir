import { z } from 'zod';
import escape from 'validator/lib/escape.js';

export const AppointmentSchema = z
  .object({
    userId: z
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
    doctorId: z
      .string()
      .trim()
      .max(128)
      .transform(function (value) {
        return escape(value);
      }),
    appointmentDate: z.coerce.date(),
    status: z
      .string()
      .trim()
      .max(128)
      .transform(function (value) {
        return escape(value);
      }),
  })
  .strict();

export const fields = [...Object.keys(AppointmentSchema.shape)];
