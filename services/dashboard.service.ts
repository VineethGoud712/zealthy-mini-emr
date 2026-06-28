import {
  getPatientAppointments,
  getPatientDashboard,
  getPatientPrescriptions,
} from '@/repositories/dashboard.repository';

export async function dashboardService(
  patientId: string,
) {
  return getPatientDashboard(patientId);
}

export async function appointmentsService(
  patientId: string,
) {
  return getPatientAppointments(patientId);
}

export async function prescriptionsService(
  patientId: string,
) {
  return getPatientPrescriptions(patientId);
}