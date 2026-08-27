import { listTeam } from "@/app/actions/team";
import { InviteForm, RemoveMemberButton } from "./TeamForms";

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const { tenant, members, invites } = await listTeam();

  if (tenant.role !== "ADMIN") {
    return (
      <div>
        <h1 className="text-3xl font-medium">Team</h1>
        <p className="mt-4 text-sm text-neutral-500">Only the company admin can manage users.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-medium">Team</h1>
      <p className="mt-2 text-sm text-neutral-500">People in {tenant.company.name}.</p>
      <InviteForm />
      <ul className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200">
        {members.map((member) => (
          <li key={member.id} className="flex items-center justify-between gap-4 py-4">
            <div>
              <p className="text-sm font-medium">{member.user.name}</p>
              <p className="text-xs text-neutral-500">
                {member.user.email} · {member.role}
              </p>
            </div>
            {member.userId === tenant.userId ? (
              <span className="text-xs text-neutral-400">You</span>
            ) : (
              <RemoveMemberButton membershipId={member.id} />
            )}
          </li>
        ))}
      </ul>
      {invites.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-sm font-medium">Open invites</h2>
          <ul className="mt-3 space-y-2 text-sm text-neutral-600">
            {invites.map((invite) => (
              <li key={invite.id}>
                {invite.email} · expires {invite.expiresAt.toLocaleDateString()}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
