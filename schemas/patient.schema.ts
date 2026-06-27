import { z } from 'zod';

export const createPatientSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.email(),

  password: z.string().min(8),

  phone: z.string().optional(),

  gender: z.enum([
    'MALE',
    'FEMALE',
    'OTHER',
  ]).optional(),
});

export const updatePatientSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.email(),

  phone: z.string().optional(),

  gender: z.enum([
    'MALE',
    'FEMALE',
    'OTHER',
  ]).optional(),
});

export type CreatePatientInput =
  z.infer<typeof createPatientSchema>;

export type UpdatePatientInput =
  z.infer<typeof updatePatientSchema>;