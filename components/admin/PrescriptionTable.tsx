import { Prescription } from "@/types/patient";

interface Props {
  prescriptions: Prescription[];
}

export default function PrescriptionTable({
  prescriptions,
}: Props) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow">
      <h2 className="mb-6 text-xl font-bold">
        Prescriptions
      </h2>

      {prescriptions.length === 0 ? (
        <p>No prescriptions.</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">
                Medication
              </th>

              <th className="text-left">
                Dosage
              </th>

              <th className="text-left">
                Quantity
              </th>
            </tr>
          </thead>

          <tbody>
            {prescriptions.map((prescription) => (
              <tr key={prescription.id}>
                <td>
                  {prescription.medication.name}
                </td>

                <td>{prescription.dosage}</td>

                <td>{prescription.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}