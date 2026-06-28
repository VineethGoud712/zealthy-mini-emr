import AppointmentForm from '@/components/admin/AppointmentForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function NewAppointmentPage({
  params,
}: Props) {
  const { id } = await params;

  return (
    <div className="mx-auto space-y-8">
      <Link
        href={`/admin/patients/${id}`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Patient
      </Link>

      <AppointmentForm patientId={id} />
    </div>
  );
}