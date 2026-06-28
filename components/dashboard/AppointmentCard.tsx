import { CalendarDays, Repeat } from 'lucide-react';

import type { Appointment } from '@/types/dashboard';

interface Props {
  appointment: Appointment;
}

export default function AppointmentCard({
  appointment,
}: Props) {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {appointment.providerName}
          </h3>

          <div className="mt-4 flex items-center gap-2 text-slate-600">
            <CalendarDays className="h-4 w-4 text-blue-600" />

            <span className="text-sm">
              {new Date(
                appointment.scheduledAt,
              ).toLocaleString()}
            </span>
          </div>

          <div className="mt-2 flex items-center gap-2 text-slate-600">
            <Repeat className="h-4 w-4 text-emerald-600" />

            <span className="text-sm">
              {appointment.repeatSchedule}
            </span>
          </div>
        </div>

        <div className="rounded-2xl bg-blue-100 p-3">
          <CalendarDays className="h-6 w-6 text-blue-600" />
        </div>
      </div>

      {appointment.notes && (
        <div className="mt-5 rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-slate-600">
            {appointment.notes}
          </p>
        </div>
      )}
    </div>
  );
}