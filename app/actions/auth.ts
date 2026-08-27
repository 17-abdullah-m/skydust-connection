"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import {
  createUserSession,
  destroyCurrentSession,
  getTenantContext,
} from "@/lib/auth/session";
import { hashPassword, publicError, slugifyCompany, verifyPassword } from "@/lib/auth/crypto";
import { loginSchema, signUpSchema } from "@/lib/validations";

export type AuthState = { error?: string };

export async function signUpAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = signUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    companyName: formData.get("companyName") || undefined,
    inviteToken: formData.get("inviteToken") || undefined,
  });
  if (!parsed.success) {
    return publicError(parsed.error.issues[0]?.message ?? "Check the form and try again.");
  }

  const { name, email, password, companyName, inviteToken } = parsed.data;

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return publicError("An account with this email already exists.");
    }

    const passwordHash = await hashPassword(password);

    if (inviteToken) {
      const invite = await prisma.invite.findUnique({ where: { token: inviteToken } });
      if (!invite || invite.expiresAt < new Date()) {
        return publicError("This invite link is invalid or has expired.");
      }
      if (invite.email !== email) {
        return publicError("Use the email address this invite was sent to.");
      }

      const user = await prisma.user.create({
        data: {
          name,
          email,
          passwordHash,
          memberships: {
            create: {
              companyId: invite.companyId,
              role: invite.role === "ADMIN" ? "ADMIN" : "MEMBER",
            },
          },
        },
      });
      await prisma.invite.delete({ where: { id: invite.id } });
      await createUserSession(user.id);
    } else {
      if (!companyName) {
        return publicError("Enter a company name.");
      }
      const company = await prisma.company.create({
        data: {
          name: companyName,
          slug: slugifyCompany(companyName),
        },
      });
      const user = await prisma.user.create({
        data: {
          name,
          email,
          passwordHash,
          memberships: {
            create: { companyId: company.id, role: "ADMIN" },
          },
        },
      });
      await createUserSession(user.id);
    }
  } catch {
    return publicError("Could not create your account. Try again.");
  }

  redirect("/dashboard");
}

export async function loginAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return publicError(parsed.error.issues[0]?.message ?? "Check the form and try again.");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: parsed.data.email },
      include: { memberships: true },
    });
    if (!user || user.memberships.length === 0) {
      return publicError("Invalid email or password.");
    }
    const ok = await verifyPassword(parsed.data.password, user.passwordHash);
    if (!ok) {
      return publicError("Invalid email or password.");
    }
    await createUserSession(user.id);
  } catch {
    return publicError("Could not sign you in. Try again.");
  }

  const next = String(formData.get("next") || "/dashboard");
  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";
  redirect(safeNext);
}

export async function logoutAction() {
  await destroyCurrentSession();
  redirect("/login");
}

export async function currentSessionAction() {
  const ctx = await getTenantContext();
  if (!ctx) return { user: null };
  return {
    user: {
      name: ctx.user.name,
      email: ctx.user.email,
      companyName: ctx.company.name,
      role: ctx.role,
    },
  };
}
