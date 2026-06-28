export interface Appointment {
  id: string;
  providerName: string;
  scheduledAt: string;
  repeatSchedule: string;
  notes?: string | null;
}

export interface Prescription {
  id: string;
  dosage: string;
  quantity: number;
  refillDate: string;
  refillSchedule: string;
  notes?: string | null;

  medication: {
    id: string;
    name: string;
  };
}

export interface DashboardData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;

  appointments: Appointment[];

  prescriptions: Prescription[];
}