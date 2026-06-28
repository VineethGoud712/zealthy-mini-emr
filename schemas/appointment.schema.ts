import { z } from 'zod';

export const appointmentSchema = z.object({
  patientId: z.string().uuid(),

  providerName: z
    .string()
    .min(2, 'Provider name is required'),

  scheduledAt: z.string(),

repeatSchedule: z.enum([
  'NONE',
  'DAILY',
  'WEEKLY',
  'MONTHLY',
]),

  repeatUntil: z.string().optional(),

  notes: z.string().optional(),
});

export type AppointmentInput =
  z.infer<typeof appointmentSchema>;