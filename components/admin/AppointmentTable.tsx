import { Appointment } from "@/types/patient";

interface Props {
  appointments: Appointment[];
}

export default function AppointmentTable({
  appointments,
}: Props) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow">
      <h2 className="mb-6 text-xl font-bold">
        Appointments
      </h2>

      {appointments.length === 0 ? (
        <p>No appointments.</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Provider</th>
              <th className="text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.providerName}</td>

                <td>
                  {new Date(
                    appointment.scheduledAt,
                  ).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}