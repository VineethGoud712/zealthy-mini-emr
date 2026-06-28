import { prisma } from '@/lib/prisma';

import PrescriptionForm from '@/components/admin/PrescriptionForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function NewPrescriptionPage({
  params,
}: Props) {
  const { id } = await params;

  const medications =
    await prisma.medication.findMany({
      orderBy: {
        name: 'asc',
      },
    });

  return (
    <div className="mx-auto  space-y-8">
      <Link
        href={`/admin/patients/${id}`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Patient
      </Link>

      <PrescriptionForm
        patientId={id}
        medications={medications}
      />
    </div>
  );
}