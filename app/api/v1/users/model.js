import { hash, compare } from 'bcrypt';
import { z } from 'zod';
import escape from 'validator/lib/escape.js';

export const PersonSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2)
      .max(128)
      .transform(function (value) {
        return escape(value);
      }),
    gender: z
      .string()
      .trim()
      .max(64)
      .transform(function (value) {
        return escape(value);
      }),
    userType: z
      .string()
      .trim()
      .max(64)
      .transform(function (value) {
        return escape(value);
      }),
    citizenshipNumber: z.number().int(),

    enabled: z.boolean(),
    locationId: z.string().trim(),
    photo: z.string().optional(),
    phone: z.number().int().optional(),
  })
  .strict();

export const LoginSchema = z
  .object({
    email: z.string().email().trim().max(64),
    password: z.string().trim().min(6).max(16),
  })
  .strict();

export const UserSchema = PersonSchema.merge(LoginSchema);

export const fields = [...Object.keys(UserSchema.shape)];

export const encryptPassword = (password) => {
  return hash(password, 10);
};

export const verifyPassword = (password, encryptPassword) => {
  return compare(password, encryptPassword);
};
