import { listCompanyAppointments } from "@/app/actions/appointments";

export const dynamic = "force-dynamic";

export default async function AppointmentsPage() {
  const rows = await listCompanyAppointments();

  return (
    <div>
      <h1 className="text-3xl font-medium">Appointments</h1>
      <p className="mt-2 text-sm text-neutral-500">
        Requests submitted while someone from your company was signed in.
      </p>
      {rows.length === 0 ? (
        <p className="mt-10 text-sm text-neutral-500">No appointments yet.</p>
      ) : (
        <ul className="mt-8 divide-y divide-neutral-200 border-y border-neutral-200">
          {rows.map((row) => (
            <li key={row.id} className="py-4">
              <p className="text-sm font-medium">
                {row.name} · {row.email}
              </p>
              <p className="mt-1 text-sm text-neutral-500">{row.companyName}</p>
              {row.notes ? <p className="mt-2 text-sm text-neutral-600">{row.notes}</p> : null}
              <p className="mt-2 text-xs text-neutral-400">{row.createdAt.toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
