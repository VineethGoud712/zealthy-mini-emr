'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Calendar,
  Clock3,
  Repeat,
  FileText,
  UserRound,
} from 'lucide-react';

import { toast } from 'sonner';

import {
  appointmentSchema,
  type AppointmentInput,
} from '@/schemas/appointment.schema';

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

interface Props {
  patientId: string;

  mode?: 'create' | 'edit';

  appointmentId?: string;

  defaultValues?: AppointmentInput;
}

export default function AppointmentForm({
  patientId,
  mode = 'create',
  appointmentId,
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
  } = useForm<AppointmentInput>({
    resolver: zodResolver(
      appointmentSchema,
    ),

    defaultValues:
      defaultValues ?? {
        patientId,
        repeatSchedule: 'NONE',
      },
  });

  async function onSubmit(
    data: AppointmentInput,
  ) {
    const url =
      mode === 'create'
        ? '/api/appointments'
        : `/api/appointments/${appointmentId}`;

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
          ? 'Unable to create appointment.'
          : 'Unable to update appointment.',
      );

      return;
    }

    toast.success(
      mode === 'create'
        ? 'Appointment created successfully.'
        : 'Appointment updated successfully.',
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
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
      <Calendar className="h-8 w-8 text-blue-600" />
    </div>

    <div>
      <CardTitle className="text-3xl">
        {mode === 'create' ? 'New Appointment' : 'Edit Appointment'}
      </CardTitle>

      <CardDescription className="mt-1 text-base">
        Schedule and manage patient appointments.
      </CardDescription>
    </div>
  </div>
</CardHeader>

      <CardContent>

        <form
          onSubmit={handleSubmit(
            onSubmit,
          )}
          className="space-y-8"
        >

          <input
            type="hidden"
            {...register(
              'patientId',
            )}
          />

          {/* Provider */}

          <div className="space-y-2">

            <Label>
              Provider
            </Label>

            <div className="relative">

              <UserRound className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <Input
                {...register(
                  'providerName',
                )}
                placeholder="Dr. John Smith"
                className="h-12 rounded-xl pl-12"
              />

            </div>

            <p className="text-sm text-red-500">
              {
                errors
                  .providerName
                  ?.message
              }
            </p>

          </div>

          {/* Date + Repeat */}

          <div className="grid gap-6 md:grid-cols-2">

            <div className="space-y-2">

              <Label>
                Date & Time
              </Label>

              <div className="relative">

                <Clock3 className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <Input
                  type="datetime-local"
                  {...register(
                    'scheduledAt',
                  )}
                  className="h-12 rounded-xl pl-12"
                />

              </div>

              <p className="text-sm text-red-500">
                {
                  errors
                    .scheduledAt
                    ?.message
                }
              </p>

            </div>

            <div className="space-y-2">

              <Label>
                Repeat Schedule
              </Label>

              <div className="relative">

                <Repeat className="absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <select
                  {...register(
                    'repeatSchedule',
                  )}
                  className="h-12 w-full rounded-xl border bg-white pl-12 pr-4"
                >

                  <option value="NONE">
                    None
                  </option>

                  <option value="DAILY">
                    Daily
                  </option>

                  <option value="WEEKLY">
                    Weekly
                  </option>

                  <option value="MONTHLY">
                    Monthly
                  </option>

                </select>

              </div>

            </div>

          </div>

                    {/* Repeat Until + Notes */}

          <div className="grid gap-6 md:grid-cols-2">

            <div className="space-y-2">

              <Label>
                Repeat Until
              </Label>

              <div className="relative">

                <Calendar className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <Input
                  type="date"
                  {...register('repeatUntil')}
                  className="h-12 rounded-xl pl-12"
                />

              </div>

            </div>

            <div className="space-y-2">

              <Label>
                Notes
              </Label>

              <div className="relative">

                <FileText className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

                <Textarea
                  rows={4}
                  {...register('notes')}
                  placeholder="Appointment notes..."
                  className="rounded-xl pl-12 pt-3 resize-none"
                />

              </div>

            </div>

          </div>

          <div className="rounded-2xl bg-slate-50 p-5">

            <h3 className="font-semibold text-slate-900">
              Appointment Information
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Schedule appointments with healthcare providers and
              optionally configure recurring visits for ongoing
              treatment or follow-up care.
            </p>

          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-xl text-base font-semibold"
          >
            {isSubmitting
              ? mode === 'create'
                ? 'Creating Appointment...'
                : 'Updating Appointment...'
              : mode === 'create'
                ? 'Create Appointment'
                : 'Update Appointment'}
          </Button>

        </form>

      </CardContent>

    </Card>
  );
}