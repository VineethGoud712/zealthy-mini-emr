import { prisma } from '@/lib/prisma';

import { RepeatSchedule } from '@prisma/client';

interface AppointmentData {
  patientId: string;

  providerName: string;

  scheduledAt: Date;

  repeatSchedule: RepeatSchedule;

  repeatUntil?: Date | null;

  notes?: string | null;
}

export async function createAppointment(
  data: AppointmentData,
) {
  return prisma.appointment.create({
    data,
  });
}

export async function updateAppointment(
  id: string,
  data: Partial<AppointmentData>,
) {
  return prisma.appointment.update({
    where: { id },
    data,
  });
}

export async function deleteAppointment(
  id: string,
) {
  return prisma.appointment.delete({
    where: {
      id,
    },
  });
}