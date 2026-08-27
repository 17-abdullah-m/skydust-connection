import Link from "next/link";
import { requireTenant } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const tenant = await requireTenant();
  const [orderCount, appointmentCount, memberCount] = await Promise.all([
    prisma.order.count({ where: { companyId: tenant.companyId } }),
    prisma.appointment.count({ where: { companyId: tenant.companyId } }),
    prisma.membership.count({ where: { companyId: tenant.companyId } }),
  ]);
  const latest = await prisma.order.findMany({
    where: { companyId: tenant.companyId },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <div>
      <h1 className="text-3xl font-medium">Dashboard</h1>
      <p className="mt-2 text-sm text-neutral-500">
        {tenant.user.name} · {tenant.company.name}
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat label="Orders" value={String(orderCount)} />
        <Stat label="Appointments" value={String(appointmentCount)} />
        <Stat label="Team" value={String(memberCount)} />
      </div>
      <section className="mt-12">
        <div className="flex items-end justify-between">
          <h2 className="text-lg font-medium">Recent orders</h2>
          <Link href="/shop" className="text-sm underline underline-offset-4">
            Shop catalog
          </Link>
        </div>
        {latest.length === 0 ? (
          <p className="mt-6 text-sm text-neutral-500">
            No orders yet. Place an order from the store cart while logged in.
          </p>
        ) : (
          <ul className="mt-6 divide-y divide-neutral-200 border-y border-neutral-200">
            {latest.map((order) => (
              <li key={order.id} className="flex justify-between py-3 text-sm">
                <span className="text-neutral-500">
                  {order.createdAt.toLocaleDateString()} · {order.status}
                </span>
                <span>{formatPrice(order.totalPkr)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-neutral-200 px-4 py-5">
      <p className="text-xs tracking-[0.18em] text-neutral-400 uppercase">{label}</p>
      <p className="mt-2 text-2xl font-medium">{value}</p>
    </div>
  );
}
