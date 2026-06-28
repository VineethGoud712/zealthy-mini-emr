import Link from 'next/link';

import {
  Activity,
  CalendarDays,
  Eye,
  Pencil,
  Plus,
  Search,
  Users,
} from 'lucide-react';

import { prisma } from '@/lib/prisma';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  Card,
  CardContent,
} from '@/components/ui/card';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default async function AdminPage() {
  const patients = await prisma.patient.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  const totalPatients = patients.length;

  const activePatients = patients.filter(
    (p) => p.status === 'ACTIVE',
  ).length;

  const inactivePatients =
    totalPatients - activePatients;

  return (
    <div className="space-y-8">

      {/* Hero */}

      <section className="overflow-hidden rounded-[32px] bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 p-5 text-white shadow-xl">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <p className="text-blue-100">
              Healthcare Management
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Welcome Back 👋
            </h1>

            <p className="mt-4 max-w-xl text-lg text-blue-100">
              Manage patients, appointments and
              prescriptions from one place.
            </p>

          </div>

          <Button
            asChild
            size="lg"
            className="rounded-2xl bg-white px-8 text-blue-700 hover:bg-slate-100"
          >
            <Link href="/admin/patients/new">

              <Plus className="mr-2 h-5 w-5" />

              New Patient

            </Link>
          </Button>

        </div>

      </section>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-3">

        <Card className="rounded-[28px] border-0 shadow-lg">

          <CardContent className="flex items-center gap-2 p-2">

            <div className="rounded-2xl bg-blue-100 p-4">

              <Users className="h-8 w-8 text-blue-600" />

            </div>

            <div>

              <p className="text-sm text-slate-500">
                Total Patients
              </p>

              <h2 className="text-4xl font-bold">
                {totalPatients}
              </h2>

            </div>

          </CardContent>

        </Card>

        <Card className="rounded-[28px] border-0 shadow-lg">

          <CardContent className="flex items-center gap-2 p-2">

            <div className="rounded-2xl bg-emerald-100 p-4">

              <Activity className="h-8 w-8 text-emerald-600" />

            </div>

            <div>

              <p className="text-sm text-slate-500">
                Active Patients
              </p>

              <h2 className="text-4xl font-bold text-emerald-600">
                {activePatients}
              </h2>

            </div>

          </CardContent>

        </Card>

        <Card className="rounded-[28px] border-0 shadow-lg">

          <CardContent className="flex items-center gap-2 p-2">

            <div className="rounded-2xl bg-orange-100 p-4">

              <CalendarDays className="h-8 w-8 text-orange-600" />

            </div>

            <div>

              <p className="text-sm text-slate-500">
                Inactive Patients
              </p>

              <h2 className="text-4xl font-bold text-orange-600">
                {inactivePatients}
              </h2>

            </div>

          </CardContent>

        </Card>

      </div>

      {/* Patient Directory */}

      <Card className="overflow-hidden rounded-[32px] border-0 shadow-lg">

        <div className="border-b p-4 pt-0">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">

            <div>

              <h2 className="text-xl font-bold">
                Patient Directory
              </h2>

              <p className="mt-1 text-slate-500">
                View and manage all registered patients.
              </p>

            </div>


          </div>

        </div>

        <CardContent className="p-0">

          <div className="overflow-x-auto">

            <Table>

              <TableHeader>

                <TableRow>

                  <TableHead>
                    Patient
                  </TableHead>

                  <TableHead>
                    Phone
                  </TableHead>

                  <TableHead>
                    Status
                  </TableHead>

                  <TableHead className="text-center">
                    Actions
                  </TableHead>

                </TableRow>

              </TableHeader>

              <TableBody>
                              {patients.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="py-24"
                  >
                    <div className="flex flex-col items-center justify-center">

                      <Users className="mb-4 h-16 w-16 text-slate-300" />

                      <h3 className="text-xl font-semibold">
                        No Patients Found
                      </h3>

                      <p className="mt-2 text-slate-500">
                        Create your first patient to get started.
                      </p>

                      <Button
                        asChild
                        className="mt-6 rounded-xl"
                      >
                        <Link href="/admin/patients/new">

                          <Plus className="mr-2 h-4 w-4" />

                          New Patient

                        </Link>
                      </Button>

                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                patients.map((patient) => (
                  <TableRow
                    key={patient.id}
                    className="transition-colors hover:bg-slate-50"
                  >
                    {/* Patient */}

                    <TableCell>

                      <div className="flex items-center gap-4">

                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold text-white">

                          {patient.firstName.charAt(0)}
                          {patient.lastName.charAt(0)}

                        </div>

                        <div>

                          <Link
                            href={`/admin/patients/${patient.id}`}
                            className="font-semibold text-slate-900 transition hover:text-blue-600"
                          >
                            {patient.firstName}{' '}
                            {patient.lastName}
                          </Link>

                          <p className="text-sm text-slate-500">
                            {patient.email}
                          </p>

                        </div>

                      </div>

                    </TableCell>

                    {/* Phone */}

                    <TableCell>

                      <span className="text-slate-600">

                        {patient.phone || '-'}

                      </span>

                    </TableCell>

                    {/* Status */}

                    <TableCell>

                      <Badge
                        className={`rounded-full px-4 py-1 ${
                          patient.status === 'ACTIVE'
                            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {patient.status === 'ACTIVE'
                          ? '🟢 Active'
                          : '⚪ Inactive'}
                      </Badge>

                    </TableCell>

                    {/* Actions */}

                    <TableCell>

                      <div className="flex justify-center gap-3">

                        <Button
                          asChild
                          variant="outline"
                          size="icon"
                          className="rounded-xl"
                        >
                          <Link
                            href={`/admin/patients/${patient.id}`}
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>

                        <Button
                          asChild
                          variant="outline"
                          size="icon"
                          className="rounded-xl"
                        >
                          <Link
                            href={`/admin/patients/${patient.id}/edit`}
                          >
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>

                      </div>

                    </TableCell>

                  </TableRow>
                ))
              )}

            </TableBody>

          </Table>

        </div>

      </CardContent>

    </Card>

  </div>
);
}