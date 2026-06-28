'use client';

import { useEffect, useState } from 'react';

import { Pill, ChevronLeft, ChevronRight } from 'lucide-react';

import PatientShell from '@/components/layout/PatientShell';

import type { Prescription } from '@/types/dashboard';

import { Button } from '@/components/ui/button';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  const ITEMS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(
    1,
    Math.ceil(prescriptions.length / ITEMS_PER_PAGE),
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentPrescriptions = prescriptions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  useEffect(() => {
    async function loadPrescriptions() {
      try {
        const response = await fetch('/api/patient/prescriptions');

        const result = await response.json();

        if (!response.ok) {
          setError(result.message ?? 'Unable to load prescriptions.');

          return;
        }

        setPrescriptions(result.data);
      } catch (err) {
        console.error(err);

        setError('Something went wrong.');
      } finally {
        setLoading(false);
      }
    }

    loadPrescriptions();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="space-y-4 text-center">
          <div className="mx-auto h-16 w-16 animate-pulse rounded-full bg-emerald-100" />

          <h2 className="text-xl font-semibold text-slate-700">
            Loading prescriptions...
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
    <PatientShell title="Prescriptions">
      <div className="space-y-8">
        {/* Hero */}

        <section className="rounded-[32px] bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 p-4 text-white shadow-xl">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-emerald-100">Your Medication</p>

              <h1 className="mt-1 text-4xl font-bold">My Prescriptions</h1>

              <p className="mt-1 text-emerald-100">
                Review all your active medications and refill schedule.
              </p>
            </div>

            <div className="hidden rounded-full bg-white/10 p-8 backdrop-blur lg:block">
              <Pill className="h-20 w-20" />
            </div>
          </div>
        </section>

        {/* Header */}

        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-1xl font-bold text-slate-900">
              Active Prescriptions
            </h2>

            <p className="mt-1 text-slate-500">
              {prescriptions.length} prescription(s) found
            </p>
          </div>
        </div>

        {/* Prescription Table */}

        {prescriptions.length === 0 ? (
          <div className="rounded-3xl bg-white py-20 text-center shadow">
            <Pill className="mx-auto mb-5 h-16 w-16 text-slate-300" />

            <h3 className="text-xl font-semibold">No Prescriptions Found</h3>

            <p className="mt-2 text-slate-500">
              You do not have any active prescriptions.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border bg-white shadow">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medication</TableHead>

                    <TableHead>Dosage</TableHead>

                    <TableHead>Quantity</TableHead>

                    <TableHead>Refill Date</TableHead>

                    <TableHead>Schedule</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {currentPrescriptions.map((prescription) => {
                    return (
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
                          {new Date(
                            prescription.refillDate,
                          ).toLocaleDateString()}
                        </TableCell>

                        <TableCell>
                          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                            {prescription.refillSchedule}
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
                  {Math.min(startIndex + ITEMS_PER_PAGE, prescriptions.length)}
                </span>{' '}
                of <span className="font-semibold">{prescriptions.length}</span>{' '}
                prescriptions
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
                  Page {currentPage} of {totalPages}
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
