export interface Appointment {
  id: string;
  providerName: string;
  scheduledAt: string;
}

export interface Prescription {
  id: string;
  dosage: string;
  quantity: number;
  refillDate: string;
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