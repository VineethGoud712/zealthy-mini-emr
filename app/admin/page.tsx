import Link from 'next/link';

import { prisma } from '@/lib/prisma';

import {
  Eye,
  Pencil,
  UserPlus,
} from 'lucide-react';

export default async function AdminPage() {
  const patients = await prisma.patient.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Patients
          </h1>

          <p className="mt-1 text-slate-500">
            Manage all patients in the EMR
          </p>
        </div>

        <Link
          href="/admin/patients/new"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          <UserPlus size={18} />

          New Patient
        </Link>
      </div>

      {/* Stats */}

      <div className="rounded-lg border bg-white p-4 shadow">
        <p className="text-sm text-slate-500">
          Total Patients
        </p>

        <p className="text-3xl font-bold">
          {patients.length}
        </p>
      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-lg border bg-white shadow">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Phone
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {patients.map((patient) => (
              <tr
                key={patient.id}
                className="border-t hover:bg-slate-50"
              >
                <td className="p-4">
                  <Link
                    href={`/admin/patients/${patient.id}`}
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    {patient.firstName} {patient.lastName}
                  </Link>
                </td>

                <td className="p-4">
                  {patient.email}
                </td>

                <td className="p-4">
                  {patient.phone || '-'}
                </td>

                <td className="p-4">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                    {patient.status}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-3">
                    <Link
                      href={`/admin/patients/${patient.id}`}
                      className="rounded-lg bg-slate-100 p-2 transition hover:bg-slate-200"
                    >
                      <Eye size={18} />
                    </Link>

                    <Link
                      href={`/admin/patients/${patient.id}/edit`}
                      className="rounded-lg bg-blue-100 p-2 text-blue-700 transition hover:bg-blue-200"
                    >
                      <Pencil size={18} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}

            {patients.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="p-10 text-center text-slate-500"
                >
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}