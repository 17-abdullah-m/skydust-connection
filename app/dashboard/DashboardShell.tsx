import Link from "next/link";
import { logoutAction } from "@/app/actions/auth";
import type { TenantContext } from "@/lib/auth/session";

const links = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/orders", label: "Orders" },
  { href: "/dashboard/appointments", label: "Appointments" },
  { href: "/dashboard/team", label: "Team" },
  { href: "/dashboard/settings", label: "Settings" },
];

export function DashboardShell({
  tenant,
  children,
}: {
  tenant: TenantContext;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-white text-neutral-900">
      <header className="border-b border-neutral-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-8">
          <Link href="/dashboard" className="text-sm font-semibold tracking-[0.18em]">
            SKYDUST
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-neutral-500 hover:text-black">
              Store
            </Link>
            <form action={logoutAction}>
              <button type="submit" className="text-neutral-500 hover:text-black">
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col md:flex-row">
        <aside className="border-b border-neutral-200 p-4 md:w-56 md:border-e md:border-b-0 md:py-8">
          <p className="text-xs tracking-[0.18em] text-neutral-400 uppercase">Company</p>
          <p className="mt-1 text-sm font-medium">{tenant.company.name}</p>
          <p className="mt-1 truncate text-xs text-neutral-500">{tenant.user.email}</p>
          <nav className="mt-6 grid gap-1 text-sm">
            {links.map((link) =>
              link.href === "/dashboard/team" && tenant.role !== "ADMIN" ? null : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-2 py-1.5 text-neutral-600 hover:bg-neutral-50 hover:text-black"
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>
        </aside>
        <main className="flex-1 px-4 py-8 md:px-10">{children}</main>
      </div>
    </div>
  );
}
