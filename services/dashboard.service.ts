import { getPatientDashboard } from '@/repositories/dashboard.repository';

export async function dashboardService(patientId: string) {
  return getPatientDashboard(patientId);
}