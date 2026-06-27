import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  ArrowLeft,
  Pencil,
  CalendarPlus,
  Pill,
} from 'lucide-react';

import PatientInfoCard from '@/components/admin/PatientInfoCard';
import AppointmentTable from '@/components/admin/AppointmentTable';
import PrescriptionTable from '@/components/admin/PrescriptionTable';

import { getPatientService } from '@/services/patient.service';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function PatientDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const patient = await getPatientService(id);

  if (!patient) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin"
            className="mb-3 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600"
          >
            <ArrowLeft size={16} />
            Back to Patients
          </Link>

          <h1 className="text-3xl font-bold">
            {patient.firstName} {patient.lastName}
          </h1>

          <p className="mt-1 text-slate-500">
            Patient Details
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href={`/admin/patients/${patient.id}/edit`}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            <Pencil size={18} />
            Edit Patient
          </Link>
        </div>
      </div>

      {/* Patient Information */}
      <PatientInfoCard patient={patient} />

      {/* Appointment Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            Appointments
          </h2>

          <button
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
            disabled
          >
            <CalendarPlus size={18} />
            Add Appointment
          </button>
        </div>

        <AppointmentTable
          appointments={patient.appointments}
        />
      </div>

      {/* Prescription Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            Prescriptions
          </h2>

          <button
            className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-700"
            disabled
          >
            <Pill size={18} />
            Add Prescription
          </button>
        </div>

        <PrescriptionTable
          prescriptions={patient.prescriptions}
        />
      </div>
    </div>
  );
}