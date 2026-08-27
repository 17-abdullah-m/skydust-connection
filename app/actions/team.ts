"use server";

import { prisma } from "@/lib/db";
import { requireAdmin, requireTenant } from "@/lib/auth/session";
import { publicError } from "@/lib/auth/crypto";
import { inviteSchema } from "@/lib/validations";
import { randomBytes } from "crypto";

export type TeamState = { error?: string; inviteUrl?: string };

export async function createInviteAction(
  _prev: TeamState,
  formData: FormData,
): Promise<TeamState> {
  const admin = await requireAdmin();
  const parsed = inviteSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return publicError(parsed.error.issues[0]?.message ?? "Enter a valid email.");
  }

  const email = parsed.data.email;
  if (email === admin.user.email) {
    return publicError("You are already in this company.");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
    include: { memberships: true },
  });
  if (existingUser) {
    return publicError("That email already has an account.");
  }

  const token = randomBytes(24).toString("hex");
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await prisma.invite.deleteMany({
    where: { companyId: admin.companyId, email },
  });
  await prisma.invite.create({
    data: {
      companyId: admin.companyId,
      email,
      token,
      role: "MEMBER",
      expiresAt,
    },
  });

  const origin = process.env.APP_URL?.replace(/\/$/, "") || "";
  const path = `/signup?invite=${token}`;
  return { inviteUrl: origin ? `${origin}${path}` : path };
}

export async function removeMemberAction(formData: FormData): Promise<TeamState> {
  const admin = await requireAdmin();
  const membershipId = String(formData.get("membershipId") || "");
  if (!membershipId) return publicError("Missing member.");

  const membership = await prisma.membership.findFirst({
    where: { id: membershipId, companyId: admin.companyId },
  });
  if (!membership) return publicError("Member not found.");
  if (membership.userId === admin.userId) {
    return publicError("You cannot remove yourself.");
  }

  await prisma.$transaction([
    prisma.session.deleteMany({ where: { userId: membership.userId } }),
    prisma.membership.delete({ where: { id: membership.id } }),
    prisma.user.delete({ where: { id: membership.userId } }),
  ]);

  return {};
}

export async function listTeam() {
  const tenant = await requireTenant();
  const [members, invites] = await Promise.all([
    prisma.membership.findMany({
      where: { companyId: tenant.companyId },
      include: { user: { select: { name: true, email: true } } },
      orderBy: { createdAt: "asc" },
    }),
    tenant.role === "ADMIN"
      ? prisma.invite.findMany({
          where: { companyId: tenant.companyId, expiresAt: { gt: new Date() } },
          orderBy: { createdAt: "desc" },
        })
      : Promise.resolve([]),
  ]);
  return { tenant, members, invites };
}
