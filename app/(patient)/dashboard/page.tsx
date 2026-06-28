'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { CalendarDays, Pill, HeartPulse } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import PatientShell from '@/components/layout/PatientShell';

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
          setError(result.message ?? 'Unable to load dashboard.');

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
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="space-y-5 text-center">
          <div className="mx-auto h-20 w-20 animate-pulse rounded-full bg-blue-100" />

          <h2 className="text-xl font-semibold text-slate-700">
            Loading Dashboard...
          </h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-10 shadow">
          <h2 className="text-xl font-semibold text-red-600">{error}</h2>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <PatientShell title="Dashboard">
      <div className="space-y-8">
        {/* Hero */}

        <section className="overflow-hidden rounded-[32px] bg-gradient-to-r from-blue-400 via-blue-600 to-cyan-500 p-4 text-white shadow-xl">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-blue-100">Welcome Back 👋</p>

              <h1 className="mt-1 text-3xl font-bold lg:text-3xl">
                {data.firstName} {data.lastName}
              </h1>

              <p className="mt-1 text-blue-100">{data.email}</p>
            </div>

            <div className="hidden rounded-full bg-white/10 p-8 backdrop-blur lg:block">
              <HeartPulse className="h-20 w-20 text-white" />
            </div>
          </div>
        </section>

        {/* Stats */}

     <section className="grid gap-4 md:grid-cols-2">

  <div className="rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md">

    <div className="flex items-center justify-between">

      <div>

        <p className="text-sm font-medium text-slate-500">
          Upcoming Appointments
        </p>

        <h2 className="mt-2 text-2xl font-bold text-slate-900">
          {data.appointments.length}
        </h2>

      </div>

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">

        <CalendarDays className="h-6 w-6 text-blue-600" />

      </div>

    </div>

  </div>

  <div className="rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md">

    <div className="flex items-center justify-between">

      <div>

        <p className="text-sm font-medium text-slate-500">
          Medication Refills
        </p>

        <h2 className="mt-2 text-2xl font-bold text-slate-900">
          {data.prescriptions.length}
        </h2>

      </div>

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">

        <Pill className="h-6 w-6 text-emerald-600" />

      </div>

    </div>

  </div>

</section>

        {/* Upcoming Appointments */}

        <section className="rounded-3xl bg-white p-8 shadow-sm">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Upcoming Appointments
              </h2>

              <p className="mt-1 text-slate-500">
                Appointments scheduled within the next 7 days
              </p>
            </div>

            <Link
              href="/appointments"
              className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              View All
            </Link>
          </div>

          {data.appointments.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-slate-200 py-12 text-center">
              <CalendarDays className="mx-auto mb-4 h-12 w-12 text-slate-300" />

              <p className="text-slate-500">
                No appointments in the next 7 days.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Provider</TableHead>

                    <TableHead>Date</TableHead>

                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {data.appointments.map((appointment: Appointment) => {
                    const date = new Date(appointment.scheduledAt);

                    return (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">
                          {appointment.providerName}
                        </TableCell>

                        <TableCell>{date.toLocaleDateString()}</TableCell>

                        <TableCell>
                          {date.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </section>

        {/* Medication Refills */}

        <section className="rounded-3xl bg-white p-8 shadow-sm">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Medication Refills
              </h2>

              <p className="mt-1 text-slate-500">
                Refills scheduled within the next 7 days
              </p>
            </div>

            <Link
              href="/prescriptions"
              className="rounded-xl bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              View All
            </Link>
          </div>

          {data.prescriptions.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-slate-200 py-12 text-center">
              <Pill className="mx-auto mb-4 h-12 w-12 text-slate-300" />

              <p className="text-slate-500">
                No medication refills in the next 7 days.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medication</TableHead>

                    <TableHead>Dosage</TableHead>

                    <TableHead>Quantity</TableHead>

                    <TableHead>Refill Date</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {data.prescriptions.map((prescription: Prescription) => (
                    <TableRow
                      key={prescription.id}
                      className="hover:bg-slate-50"
                    >
                      <TableCell className="font-medium">
                        {prescription.medication.name}
                      </TableCell>

                      <TableCell>{prescription.dosage}</TableCell>

                      <TableCell>{prescription.quantity}</TableCell>

                      <TableCell>
                        {new Date(prescription.refillDate).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </section>
      </div>
    </PatientShell>
  );
}
