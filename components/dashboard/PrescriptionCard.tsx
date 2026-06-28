import {
  CalendarClock,
  Pill,
} from 'lucide-react';

import type { Prescription } from '@/types/dashboard';

interface Props {
  prescription: Prescription;
}

export default function PrescriptionCard({
  prescription,
}: Props) {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {prescription.medication.name}
          </h3>

          <p className="mt-3 text-slate-600">
            Dosage: {prescription.dosage}
          </p>

          <p className="text-slate-600">
            Quantity: {prescription.quantity}
          </p>

          <div className="mt-3 flex items-center gap-2 text-slate-600">
            <CalendarClock className="h-4 w-4 text-blue-600" />

            <span className="text-sm">
              {new Date(
                prescription.refillDate,
              ).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="rounded-2xl bg-emerald-100 p-3">
          <Pill className="h-6 w-6 text-emerald-600" />
        </div>
      </div>

      {prescription.notes && (
        <div className="mt-5 rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-slate-600">
            {prescription.notes}
          </p>
        </div>
      )}
    </div>
  );
}