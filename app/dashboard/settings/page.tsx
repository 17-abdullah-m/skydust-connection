import { requireTenant } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const tenant = await requireTenant();

  return (
    <div>
      <h1 className="text-3xl font-medium">Settings</h1>
      <dl className="mt-8 max-w-lg space-y-4 text-sm">
        <div className="flex justify-between border-b border-neutral-200 py-3">
          <dt className="text-neutral-500">Company</dt>
          <dd>{tenant.company.name}</dd>
        </div>
        <div className="flex justify-between border-b border-neutral-200 py-3">
          <dt className="text-neutral-500">Company ID</dt>
          <dd className="font-mono text-xs">{tenant.company.slug}</dd>
        </div>
        <div className="flex justify-between border-b border-neutral-200 py-3">
          <dt className="text-neutral-500">Your name</dt>
          <dd>{tenant.user.name}</dd>
        </div>
        <div className="flex justify-between border-b border-neutral-200 py-3">
          <dt className="text-neutral-500">Email</dt>
          <dd>{tenant.user.email}</dd>
        </div>
        <div className="flex justify-between border-b border-neutral-200 py-3">
          <dt className="text-neutral-500">Role</dt>
          <dd>{tenant.role === "ADMIN" ? "Admin" : "Member"}</dd>
        </div>
      </dl>
    </div>
  );
}
