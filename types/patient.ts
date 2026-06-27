import { RepeatSchedule, RefillSchedule } from '@prisma/client';

export interface Appointment {
  id: string;
  providerName: string;
  scheduledAt: Date;
  repeatSchedule: RepeatSchedule;
  repeatUntil: Date | null;
  notes: string | null;
}

export interface Prescription {
  id: string;
  dosage: string;
  quantity: number;

  refillDate: Date;
  refillSchedule: RefillSchedule;
  refillUntil: Date | null;

  notes: string | null;

  medication: {
    id: string;
    name: string;
  };
}