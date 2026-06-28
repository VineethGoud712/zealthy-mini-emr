import { notFound } from 'next/navigation';

import { prisma } from '@/lib/prisma';

import PrescriptionForm from '@/components/admin/PrescriptionForm';

interface Props {
  params: Promise<{
    id: string;
    prescriptionId: string;
  }>;
}

export default async function EditPrescriptionPage({
  params,
}: Props) {
  const {
    id,
    prescriptionId,
  } = await params;

  const prescription =
    await prisma.prescription.findUnique({
      where: {
        id: prescriptionId,
      },
      include: {
        medication: true,
      },
    });

  if (!prescription) {
    notFound();
  }

  const medications =
    await prisma.medication.findMany({
      orderBy: {
        name: 'asc',
      },
    });

  return (
    <div className="mx-auto space-y-8">

<PrescriptionForm
  patientId={id}
  prescriptionId={prescription.id}
  medications={medications}
  mode="edit"
  defaultValues={{
    patientId: prescription.patientId,
    medicationId: prescription.medicationId,
    dosage: prescription.dosage,
    quantity: prescription.quantity,
    refillDate: prescription.refillDate
      .toISOString()
      .slice(0, 10),
    refillSchedule: prescription.refillSchedule,
    refillUntil:
      prescription.refillUntil
        ?.toISOString()
        .slice(0, 10) ?? '',
    notes: prescription.notes ?? '',
  }}
/>
    </div>
  );
}