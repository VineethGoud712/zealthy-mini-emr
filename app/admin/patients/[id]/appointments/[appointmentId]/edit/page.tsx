import { notFound } from 'next/navigation';

import AppointmentForm from '@/components/admin/AppointmentForm';

import { prisma } from '@/lib/prisma';

interface Props {
  params: Promise<{
    id: string;
    appointmentId: string;
  }>;
}

export default async function EditAppointmentPage({
  params,
}: Props) {
  const {
    id,
    appointmentId,
  } = await params;

  const appointment =
    await prisma.appointment.findUnique({
      where: {
        id: appointmentId,
      },
    });

  if (!appointment) {
    notFound();
  }

  return (
    <div className="mx-auto  space-y-8">


<AppointmentForm
  patientId={id}
  appointmentId={appointmentId}
  mode="edit"
  defaultValues={{
    patientId: appointment.patientId,
    providerName: appointment.providerName,
    scheduledAt: appointment.scheduledAt
      .toISOString()
      .slice(0, 16),
    repeatSchedule:
      appointment.repeatSchedule,
    repeatUntil:
      appointment.repeatUntil
        ?.toISOString()
        .slice(0, 10) ?? '',
    notes: appointment.notes ?? '',
  }}
/>

    </div>
  );
}