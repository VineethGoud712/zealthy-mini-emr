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

interface Prescription {
  id: string;
  patientId: string;

  dosage: string;

  quantity: number;

  refillDate: Date;

  refillSchedule: string;

  medication: {
    name: string;
  };
}

interface Props {
  prescriptions: Prescription[];
}

export default function PrescriptionTable({
  prescriptions,
}: Props) {
  if (prescriptions.length === 0) {
    return (
      <p className="text-muted-foreground">
        No prescriptions found.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            Medication
          </TableHead>

          <TableHead>
            Dosage
          </TableHead>

          <TableHead>
            Quantity
          </TableHead>

          <TableHead>
            Refill
          </TableHead>

          <TableHead className="text-center">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {prescriptions.map(
          (prescription) => (
            <TableRow
              key={prescription.id}
            >
              <TableCell>
                {
                  prescription
                    .medication.name
                }
              </TableCell>

              <TableCell>
                {prescription.dosage}
              </TableCell>

              <TableCell>
                {prescription.quantity}
              </TableCell>

              <TableCell>
                {prescription.refillDate.toLocaleDateString()}
              </TableCell>

              <TableCell>
                <div className="flex justify-center gap-2">

                  <Button
                    asChild
                    size="icon"
                    variant="outline"
                  >
                    <Link
                      href={`/admin/patients/${prescription.patientId}/prescriptions/${prescription.id}/edit`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>

                  <DeleteDialog
                    url={`/api/prescriptions/${prescription.id}`}
                    title="Delete Prescription"
                    description="Are you sure you want to delete this prescription?"
                  />

                </div>
              </TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  );
}