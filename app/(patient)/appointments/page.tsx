'use client';


import { useEffect, useState } from 'react';

import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';

import PatientShell from '@/components/layout/PatientShell';

import { Button } from '@/components/ui/button';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { Appointment } from '@/types/dashboard';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  const ITEMS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(
    1,
    Math.ceil(appointments.length / ITEMS_PER_PAGE),
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentAppointments = appointments.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  useEffect(() => {
    async function loadAppointments() {
      try {
        const response = await fetch('/api/patient/appointments');

        const result = await response.json();

        if (!response.ok) {
          setError(result.message ?? 'Unable to load appointments.');

          return;
        }

        setAppointments(result.data);
      } catch (err) {
        console.error(err);

        setError('Something went wrong.');
      } finally {
        setLoading(false);
      }
    }

    loadAppointments();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="space-y-4 text-center">
          <div className="mx-auto h-16 w-16 animate-pulse rounded-full bg-blue-100" />

          <h2 className="text-xl font-semibold text-slate-700">
            Loading appointments...
          </h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 shadow">
          <h2 className="text-lg font-semibold text-red-600">{error}</h2>
        </div>
      </div>
    );
  }

  return (
    <PatientShell title="Appointments">
      <div className="space-y-8">
        {/* Hero */}

        <section className="rounded-[32px] bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 p-4 pt-1 text-white shadow-xl">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-blue-100">Your Schedule</p>

              <h1 className="mt-1 text-3xl font-bold">Upcoming Appointments</h1>

              <p className="mt-1 text-blue-100">
                View and manage your upcoming visits.
              </p>
            </div>

            <div className="hidden rounded-full bg-white/10 p-8 backdrop-blur lg:block">
              <CalendarDays className="h-20 w-20" />
            </div>
          </div>
        </section>

        {/* Header */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              All Appointments
            </h2>

            <p className="mt-1 text-slate-500">
              {appointments.length} appointment(s) found
            </p>
          </div>
        </div>

        {/* Cards */}

        {/* Appointment Table */}

        {appointments.length === 0 ? (
          <div className="rounded-3xl bg-white py-20 text-center shadow">
            <CalendarDays className="mx-auto mb-5 h-16 w-16 text-slate-300" />

            <h3 className="text-xl font-semibold">No Upcoming Appointments</h3>

            <p className="mt-2 text-slate-500">You are all caught up.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border bg-white shadow">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Provider</TableHead>

                    <TableHead>Date</TableHead>

                    <TableHead>Time</TableHead>

                    <TableHead>Repeat</TableHead>

                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {currentAppointments.map((appointment) => {
                    const date = new Date(appointment.scheduledAt);

                    return (
                      <TableRow
                        key={appointment.id}
                        className="hover:bg-slate-50"
                      >
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

                        <TableCell>
                          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                            {appointment.repeatSchedule}
                          </span>
                        </TableCell>

                        <TableCell>
                          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                            Upcoming
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}

            <div className="flex flex-col items-center justify-between gap-4 border-t bg-slate-50 px-6 py-4 sm:flex-row">
              <p className="text-sm text-slate-500">
                Showing <span className="font-semibold">{startIndex + 1}</span>{' '}
                to{' '}
                <span className="font-semibold">
                  {Math.min(startIndex + ITEMS_PER_PAGE, appointments.length)}
                </span>{' '}
                of <span className="font-semibold">{appointments.length}</span>{' '}
                appointments
              </p>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(page - 1, 1))
                  }
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Previous
                </Button>

                <div className="rounded-lg border bg-white px-4 py-2 text-sm font-semibold">
                  {currentPage} / {totalPages}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((page) => Math.min(page + 1, totalPages))
                  }
                >
                  Next
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PatientShell>
  );
}
