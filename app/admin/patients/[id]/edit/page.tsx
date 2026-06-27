import { notFound } from 'next/navigation';

import EditPatientForm from '@/components/admin/EditPatientForm';

import { getPatientService } from '@/services/patient.service';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPatientPage({
  params,
}: Props) {
  const { id } = await params;

  const patient = await getPatientService(id);

  if (!patient) {
    notFound();
  }

  return (
    <EditPatientForm
      patientId={patient.id}
      defaultValues={{
        firstName: patient.firstName,
        lastName: patient.lastName,
        email: patient.email,
        phone: patient.phone ?? '',
        gender: patient.gender ?? undefined,
      }}
    />
  );
}