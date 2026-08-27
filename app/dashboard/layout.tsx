import { requireTenant } from "@/lib/auth/session";
import { DashboardShell } from "./DashboardShell";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const tenant = await requireTenant();
  return <DashboardShell tenant={tenant}>{children}</DashboardShell>;
}
