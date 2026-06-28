import Link from 'next/link';

import { Pencil } from 'lucide-react';

import DeleteDialog from './DeleteDialog';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';

interface Appointment {
  id: string;
  patientId: string;
  providerName: string;
  scheduledAt: Date;
  repeatSchedule: string;
}

interface Props {
  appointments: Appointment[];
}

export default function AppointmentTable({
  appointments,
}: Props) {
  if (appointments.length === 0) {
    return (
      <p className="text-muted-foreground">
        No appointments found.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Provider</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Repeat</TableHead>
          <TableHead className="text-center">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {appointments.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell>
              {appointment.providerName}
            </TableCell>

            <TableCell>
              {appointment.scheduledAt.toLocaleString()}
            </TableCell>

            <TableCell>
              {appointment.repeatSchedule}
            </TableCell>

            <TableCell>
              <div className="flex justify-center gap-2">
                <Button
                  asChild
                  size="icon"
                  variant="outline"
                >
                  <Link
                    href={`/admin/patients/${appointment.patientId}/appointments/${appointment.id}/edit`}
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                </Button>

                <DeleteDialog
                  url={`/api/appointments/${appointment.id}`}
                  title="Delete Appointment"
                  description="Are you sure you want to delete this appointment?"
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}