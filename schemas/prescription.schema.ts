import { z } from 'zod';

export const prescriptionSchema = z.object({
  patientId: z.string().uuid(),

  medicationId: z.string().uuid(),

  dosage: z.string().min(1),

  quantity: z.number().int().positive(),

  refillDate: z.string(),

  refillSchedule: z.enum([
    'NONE',
    'WEEKLY',
    'MONTHLY',
    'QUARTERLY',
  ]),

  refillUntil: z.string().optional(),

  notes: z.string().optional(),
});

export type PrescriptionInput =
  z.infer<typeof prescriptionSchema>;