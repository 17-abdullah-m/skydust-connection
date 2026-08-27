"use server";

import { prisma } from "@/lib/db";
import { getTenantContext } from "@/lib/auth/session";
import { publicError } from "@/lib/auth/crypto";
import { appointmentSchema } from "@/lib/validations";

export type AppointmentState = { error?: string; ok?: boolean };

export async function createAppointmentAction(
  _prev: AppointmentState,
  formData: FormData,
): Promise<AppointmentState> {
  const parsed = appointmentSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    companyName: formData.get("companyName"),
    notes: formData.get("notes") || "",
  });
  if (!parsed.success) {
    return publicError(parsed.error.issues[0]?.message ?? "Check the form and try again.");
  }

  const tenant = await getTenantContext();

  try {
    await prisma.appointment.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        companyName: parsed.data.companyName,
        notes: parsed.data.notes || "",
        companyId: tenant?.companyId ?? null,
      },
    });
  } catch {
    return publicError("Could not send your request. Try again.");
  }

  return { ok: true };
}

export async function listCompanyAppointments() {
  const { requireTenant } = await import("@/lib/auth/session");
  const tenant = await requireTenant();
  return prisma.appointment.findMany({
    where: { companyId: tenant.companyId },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
}
