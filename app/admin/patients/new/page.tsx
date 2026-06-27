import PatientForm from '@/components/admin/PatientForm';

export default function NewPatientPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          New Patient
        </h1>

        <p className="text-slate-500">
          Add a patient to the EMR.
        </p>
      </div>

      <PatientForm />
    </div>
  );
}