import {
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from '@/repositories/appointment.repository';

import type { AppointmentInput } from '@/schemas/appointment.schema';

export async function createAppointmentService(
  appointment: AppointmentInput,
) {
  return createAppointment({
    patientId: appointment.patientId,

    providerName: appointment.providerName,

    scheduledAt: new Date(
      appointment.scheduledAt,
    ),

    repeatSchedule: appointment.repeatSchedule,

    repeatUntil: appointment.repeatUntil
      ? new Date(appointment.repeatUntil)
      : null,

    notes: appointment.notes,
  });
}

export async function updateAppointmentService(
  id: string,
  appointment: AppointmentInput,
) {
  return updateAppointment(id, {
    providerName: appointment.providerName,

    scheduledAt: new Date(
      appointment.scheduledAt,
    ),

    repeatSchedule: appointment.repeatSchedule,

    repeatUntil: appointment.repeatUntil
      ? new Date(appointment.repeatUntil)
      : null,

    notes: appointment.notes,
  });
}

export async function deleteAppointmentService(
  id: string,
) {
  return deleteAppointment(id);
}