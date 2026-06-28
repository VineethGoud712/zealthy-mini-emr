'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Pill,
  Package,
  Calendar,
  Repeat,
  FileText,
} from 'lucide-react';

import { toast } from 'sonner';

import {
  prescriptionSchema,
  type PrescriptionInput,
} from '@/schemas/prescription.schema';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

interface Medication {
  id: string;
  name: string;
}

interface Props {
  patientId: string;

  medications: Medication[];

  mode?: 'create' | 'edit';

  prescriptionId?: string;

  defaultValues?: PrescriptionInput;
}

export default function PrescriptionForm({
  patientId,
  medications,
  mode = 'create',
  prescriptionId,
  defaultValues,
}: Props) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<PrescriptionInput>({
    resolver: zodResolver(
      prescriptionSchema,
    ),

    defaultValues:
      defaultValues ?? {
        patientId,
        refillSchedule: 'NONE',
        quantity: 30,
      },
  });

  async function onSubmit(
    data: PrescriptionInput,
  ) {
    const url =
      mode === 'create'
        ? '/api/prescriptions'
        : `/api/prescriptions/${prescriptionId}`;

    const method =
      mode === 'create'
        ? 'POST'
        : 'PATCH';

    const response = await fetch(url, {
      method,

      headers: {
        'Content-Type':
          'application/json',
      },

      body: JSON.stringify(data),
    });

    if (!response.ok) {
      toast.error(
        mode === 'create'
          ? 'Unable to create prescription.'
          : 'Unable to update prescription.',
      );

      return;
    }

    toast.success(
      mode === 'create'
        ? 'Prescription created successfully.'
        : 'Prescription updated successfully.',
    );

    router.push(
      `/admin/patients/${patientId}`,
    );

    router.refresh();
  }

  return (
    <Card className="rounded-[32px] border-0 shadow-xl">

    <CardHeader>
  <div className="flex items-center gap-5">
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">
      <Pill className="h-8 w-8 text-emerald-600" />
    </div>

    <div>
      <CardTitle className="text-3xl">
        {mode === 'create'
          ? 'New Prescription'
          : 'Edit Prescription'}
      </CardTitle>

      <CardDescription className="mt-1 text-base">
        Manage medication prescriptions and refill schedules.
      </CardDescription>
    </div>
  </div>
</CardHeader>

      <CardContent>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8"
        >

          <input
            type="hidden"
            {...register('patientId')}
          />

          {/* Medication */}

          <div className="space-y-2">

            <Label>
              Medication
            </Label>

            <div className="relative">

              <Pill className="absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <select
                {...register('medicationId')}
                className="h-12 w-full rounded-xl border bg-white pl-12 pr-4"
              >
                <option value="">
                  Select Medication
                </option>

                {medications.map(
                  (medication) => (
                    <option
                      key={
                        medication.id
                      }
                      value={
                        medication.id
                      }
                    >
                      {medication.name}
                    </option>
                  ),
                )}
              </select>

            </div>

            <p className="text-sm text-red-500">
              {
                errors
                  .medicationId
                  ?.message
              }
            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            {/* Dosage */}

            <div className="space-y-2">

              <Label>
                Dosage
              </Label>

              <div className="relative">

                <Package className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <Input
                  {...register(
                    'dosage',
                  )}
                  placeholder="500mg"
                  className="h-12 rounded-xl pl-12"
                />

              </div>

              <p className="text-sm text-red-500">
                {
                  errors
                    .dosage
                    ?.message
                }
              </p>

            </div>

            {/* Quantity */}

            <div className="space-y-2">

              <Label>
                Quantity
              </Label>

              <div className="relative">

                <Package className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <Input
                  type="number"
                  className="h-12 rounded-xl pl-12"
                  {...register(
                    'quantity',
                    {
                      valueAsNumber:
                        true,
                    },
                  )}
                />

              </div>

              <p className="text-sm text-red-500">
                {
                  errors
                    .quantity
                    ?.message
                }
              </p>

            </div>

          </div>

                    {/* Refill Information */}

          <div className="grid gap-6 md:grid-cols-2">

            {/* Refill Date */}

            <div className="space-y-2">

              <Label>
                Refill Date
              </Label>

              <div className="relative">

                <Calendar className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <Input
                  type="date"
                  {...register('refillDate')}
                  className="h-12 rounded-xl pl-12"
                />

              </div>

            </div>

            {/* Refill Schedule */}

            <div className="space-y-2">

              <Label>
                Refill Schedule
              </Label>

              <div className="relative">

                <Repeat className="absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <select
                  {...register('refillSchedule')}
                  className="h-12 w-full rounded-xl border bg-white pl-12 pr-4"
                >
                  <option value="NONE">
                    None
                  </option>

                  <option value="WEEKLY">
                    Weekly
                  </option>

                  <option value="MONTHLY">
                    Monthly
                  </option>

                  <option value="QUARTERLY">
                    Quarterly
                  </option>

                </select>

              </div>

            </div>

          </div>

          {/* Refill Until */}

          <div className="space-y-2">

            <Label>
              Refill Until
            </Label>

            <div className="relative">

              <Calendar className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <Input
                type="date"
                {...register('refillUntil')}
                className="h-12 rounded-xl pl-12"
              />

            </div>

          </div>

          {/* Notes */}

          <div className="space-y-2">

            <Label>
              Notes
            </Label>

            <div className="relative">

              <FileText className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

              <Textarea
                rows={4}
                {...register('notes')}
                placeholder="Prescription notes..."
                className="resize-none rounded-xl pl-12 pt-3"
              />

            </div>

          </div>

          {/* Information */}

          <div className="rounded-2xl bg-slate-50 p-5">

            <h3 className="font-semibold text-slate-900">
              Prescription Information
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Record medication dosage, refill schedule,
              and any important instructions for the patient.
            </p>

          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-xl text-base font-semibold"
          >
            {isSubmitting
              ? mode === 'create'
                ? 'Creating Prescription...'
                : 'Updating Prescription...'
              : mode === 'create'
                ? 'Create Prescription'
                : 'Update Prescription'}
          </Button>

        </form>

      </CardContent>

    </Card>
  );
}