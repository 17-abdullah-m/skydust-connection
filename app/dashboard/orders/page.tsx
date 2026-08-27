import { listCompanyOrders } from "@/app/actions/orders";
import { formatPrice } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const orders = await listCompanyOrders();

  return (
    <div>
      <h1 className="text-3xl font-medium">Orders</h1>
      <p className="mt-2 text-sm text-neutral-500">Orders for your company only.</p>
      {orders.length === 0 ? (
        <p className="mt-10 text-sm text-neutral-500">No orders yet.</p>
      ) : (
        <ul className="mt-8 space-y-6">
          {orders.map((order) => (
            <li key={order.id} className="border border-neutral-200 p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-sm font-medium">{formatPrice(order.totalPkr)}</p>
                <p className="text-xs text-neutral-500">
                  {order.createdAt.toLocaleString()} · {order.status}
                  {order.user ? ` · ${order.user.email}` : ""}
                </p>
              </div>
              <ul className="mt-3 space-y-1 text-sm text-neutral-600">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.title} × {item.qty}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
