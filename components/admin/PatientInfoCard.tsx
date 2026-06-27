import { Patient } from '@prisma/client';

interface Props {
  patient: Patient;
}

export default function PatientInfoCard({
  patient,
}: Props) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow">
      <h2 className="mb-6 text-xl font-bold">
        Patient Information
      </h2>

      <div className="grid grid-cols-2 gap-5">
        <div>
          <p className="text-sm text-slate-500">
            Name
          </p>

          <p className="font-medium">
            {patient.firstName} {patient.lastName}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Email
          </p>

          <p>{patient.email}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Phone
          </p>

          <p>{patient.phone || '-'}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Gender
          </p>

          <p>{patient.gender || '-'}</p>
        </div>
      </div>
    </div>
  );
}