import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  ArrowLeft,
  CalendarPlus,
  Pencil,
  Pill,
  User,
} from 'lucide-react';

import { getPatientService } from '@/services/patient.service';

import PatientInfoCard from '@/components/admin/PatientInfoCard';
import AppointmentTable from '@/components/admin/AppointmentTable';
import PrescriptionTable from '@/components/admin/PrescriptionTable';

import { Button } from '@/components/ui/button';

import {
  Card,
  CardContent,
} from '@/components/ui/card';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function PatientDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const patient =
    await getPatientService(id);

  if (!patient) {
    notFound();
  }

  return (
    <div className="space-y-8">
          <Link
        href="/admin"
        className="mb-3 inline-flex items-center gap-2 text-black-100 transition hover:text-blue"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Patients
      </Link>

      {/* Hero */}
<Card className="overflow-hidden rounded-[32px] border-0 bg-gradient-to-r from-blue-600 via-blue-600 to-cyan-500 text-white shadow-xl">

  <CardContent className="flex flex-col gap-4 p-4 px-8 py-5 lg:flex-row lg:items-center lg:justify-between">
    <div>
    

      <h1 className="text-3xl font-bold">
        {patient.firstName} {patient.lastName}
      </h1>

      <p className="mt-1 text-blue-100">
        Patient Profile
      </p>
    </div>

    <div className="hidden rounded-full bg-white/10 p-5 backdrop-blur lg:block">
      <User className="h-14 w-14" />
    </div>
  </CardContent>
</Card>

      {/* Actions */}

      <div className="flex flex-wrap gap-4">

        <Button
          asChild
          className="rounded-xl"
        >
          <Link
            href={`/admin/patients/${patient.id}/edit`}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit Patient
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className="rounded-xl"
        >
          <Link
            href={`/admin/patients/${patient.id}/appointments/new`}
          >
            <CalendarPlus className="mr-2 h-4 w-4" />
            Add Appointment
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className="rounded-xl"
        >
          <Link
            href={`/admin/patients/${patient.id}/prescriptions/new`}
          >
            <Pill className="mr-2 h-4 w-4" />
            Add Prescription
          </Link>
        </Button>

      </div>

      {/* Patient Information */}

      <section className="space-y-4">

        <h2 className="text-2xl font-bold">
          Patient Information
        </h2>

        <PatientInfoCard
          patient={patient}
        />

      </section>

      {/* Appointments */}

      <section className="space-y-4">

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Appointments
          </h2>

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            {patient.appointments.length} Total
          </span>

        </div>

        <Card className="rounded-3xl shadow-sm">

          <CardContent className="p-6">

            <AppointmentTable
              appointments={
                patient.appointments
              }
            />

          </CardContent>

        </Card>

      </section>

      {/* Prescriptions */}

      <section className="space-y-4">

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Prescriptions
          </h2>

          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
            {patient.prescriptions.length} Total
          </span>

        </div>

        <Card className="rounded-3xl shadow-sm">

          <CardContent className="p-6">

            <PrescriptionTable
              prescriptions={
                patient.prescriptions
              }
            />

          </CardContent>

        </Card>

      </section>

    </div>
  );
}