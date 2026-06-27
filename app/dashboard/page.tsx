'use client';

import { useEffect, useState } from 'react';
import type {
  Appointment,
  DashboardData,
  Prescription,
} from '@/types/dashboard';

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadDashboard() {
      try {
        const response = await fetch('/api/dashboard');

        const result = await response.json();

        if (!response.ok) {
          setError(result.message || 'Unable to load dashboard.');
          return;
        }

        setData(result.data);
      } catch (err) {
        console.error(err);
        setError('Something went wrong.');
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-xl font-semibold">Loading dashboard...</h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <h2 className="text-lg font-semibold text-red-600">
            {error}
          </h2>
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h2>No dashboard data found.</h2>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-6xl p-8">
        <div className="mb-8 rounded-xl bg-white p-6 shadow">
          <h1 className="text-3xl font-bold">
            Welcome, {data.firstName} {data.lastName}
          </h1>

          <p className="mt-2 text-gray-600">{data.email}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Appointments */}
          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-5 text-2xl font-semibold">
              Upcoming Appointments
            </h2>

            {data.appointments.length === 0 ? (
              <p className="text-gray-500">
                No upcoming appointments.
              </p>
            ) : (
              <div className="space-y-4">
                {data.appointments.map(
                  (appointment: Appointment) => (
                    <div
                      key={appointment.id}
                      className="rounded-lg border p-4"
                    >
                      <p className="font-semibold">
                        {appointment.providerName}
                      </p>

                      <p className="text-sm text-gray-600">
                        {new Date(
                          appointment.scheduledAt,
                        ).toLocaleString()}
                      </p>
                    </div>
                  ),
                )}
              </div>
            )}
          </div>

          {/* Prescriptions */}
          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-5 text-2xl font-semibold">
              Upcoming Medication Refills
            </h2>

            {data.prescriptions.length === 0 ? (
              <p className="text-gray-500">
                No upcoming refills.
              </p>
            ) : (
              <div className="space-y-4">
                {data.prescriptions.map(
                  (prescription: Prescription) => (
                    <div
                      key={prescription.id}
                      className="rounded-lg border p-4"
                    >
                      <p className="font-semibold">
                        {prescription.medication.name}
                      </p>

                      <p>
                        Dosage: {prescription.dosage}
                      </p>

                      <p>
                        Quantity: {prescription.quantity}
                      </p>

                      <p className="text-sm text-gray-600">
                        Refill Date:{' '}
                        {new Date(
                          prescription.refillDate,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  ),
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}