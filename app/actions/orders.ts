"use server";

import { prisma } from "@/lib/db";
import { requireTenant } from "@/lib/auth/session";
import { publicError } from "@/lib/auth/crypto";
import { checkoutSchema } from "@/lib/validations";
import { getProduct } from "@/lib/products";

export type OrderState = { error?: string; orderId?: string };

export async function placeOrderAction(
  items: { slug: string; qty: number }[],
): Promise<OrderState> {
  const tenant = await requireTenant();
  const parsed = checkoutSchema.safeParse({ items });
  if (!parsed.success) {
    return publicError(parsed.error.issues[0]?.message ?? "Cart is invalid.");
  }

  const lines = [];
  for (const item of parsed.data.items) {
    const product = getProduct(item.slug);
    if (!product) {
      return publicError("A product in your cart is no longer available.");
    }
    lines.push({
      productSlug: product.slug,
      title: product.title,
      pricePkr: product.price,
      qty: item.qty,
      image: product.image,
    });
  }

  const totalPkr = lines.reduce((sum, line) => sum + line.pricePkr * line.qty, 0);

  const order = await prisma.order.create({
    data: {
      companyId: tenant.companyId,
      userId: tenant.userId,
      status: "CONFIRMED",
      totalPkr,
      items: { create: lines },
    },
  });

  return { orderId: order.id };
}

export async function listCompanyOrders() {
  const tenant = await requireTenant();
  return prisma.order.findMany({
    where: { companyId: tenant.companyId },
    include: { items: true, user: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
}

export async function getCompanyOrder(orderId: string) {
  const tenant = await requireTenant();
  return prisma.order.findFirst({
    where: { id: orderId, companyId: tenant.companyId },
    include: { items: true },
  });
}
