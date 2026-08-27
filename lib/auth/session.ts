import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import {
  createSessionToken,
  hashSessionToken,
  sessionCookieName,
  sessionMaxAgeSeconds,
} from "@/lib/auth/crypto";

const SESSION_MS = sessionMaxAgeSeconds() * 1000;

export type TenantContext = {
  userId: string;
  companyId: string;
  role: "ADMIN" | "MEMBER";
  user: { name: string; email: string };
  company: { name: string; slug: string };
};

async function cookieOptions() {
  return {
    name: sessionCookieName(),
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionMaxAgeSeconds(),
  };
}

export async function createUserSession(userId: string) {
  const token = createSessionToken();
  const tokenHash = hashSessionToken(token);
  const expiresAt = new Date(Date.now() + SESSION_MS);
  await prisma.session.create({
    data: { tokenHash, userId, expiresAt },
  });
  const store = await cookies();
  store.set({ ...(await cookieOptions()), value: token });
}

export async function destroyCurrentSession() {
  const store = await cookies();
  const token = store.get(sessionCookieName())?.value;
  if (token) {
    try {
      await prisma.session.deleteMany({
        where: { tokenHash: hashSessionToken(token) },
      });
    } catch {
      // AUTH_SECRET missing or DB down — still clear cookie
    }
  }
  store.set({ ...(await cookieOptions()), value: "", maxAge: 0 });
}

export async function getTenantContext(): Promise<TenantContext | null> {
  const store = await cookies();
  const token = store.get(sessionCookieName())?.value;
  if (!token) return null;

  let tokenHash: string;
  try {
    tokenHash = hashSessionToken(token);
  } catch {
    return null;
  }

  const session = await prisma.session.findUnique({
    where: { tokenHash },
    include: {
      user: {
        include: {
          memberships: { include: { company: true } },
        },
      },
    },
  });

  if (!session || session.expiresAt < new Date()) {
    if (session) {
      await prisma.session.delete({ where: { id: session.id } }).catch(() => {});
    }
    return null;
  }

  const membership = session.user.memberships[0];
  if (!membership) return null;

  const role = membership.role === "ADMIN" ? "ADMIN" : "MEMBER";
  return {
    userId: session.user.id,
    companyId: membership.companyId,
    role,
    user: { name: session.user.name, email: session.user.email },
    company: { name: membership.company.name, slug: membership.company.slug },
  };
}

export async function requireTenant(): Promise<TenantContext> {
  const ctx = await getTenantContext();
  if (!ctx) {
    const { redirect } = await import("next/navigation");
    redirect("/login");
  }
  return ctx;
}

export async function requireAdmin(): Promise<TenantContext> {
  const ctx = await requireTenant();
  if (ctx.role !== "ADMIN") {
    const { redirect } = await import("next/navigation");
    redirect("/dashboard");
  }
  return ctx;
}
