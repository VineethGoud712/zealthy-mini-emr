import { RepeatSchedule } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export interface AppointmentRepositoryInput {
  patientId: string;
  providerName: string;
  scheduledAt: Date;
  repeatSchedule: RepeatSchedule;
  repeatUntil?: Date | null;
  notes?: string | null;
}

export async function createAppointment(
  data: AppointmentRepositoryInput,
) {
  return prisma.appointment.create({
    data,
  });
}

export async function updateAppointment(
  id: string,
  data: Partial<AppointmentRepositoryInput>,
) {
  return prisma.appointment.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteAppointment(id: string) {
  return prisma.appointment.delete({
    where: {
      id,
    },
  });
}

export async function getAppointmentById(id: string) {
  return prisma.appointment.findUnique({
    where: {
      id,
    },
  });
}