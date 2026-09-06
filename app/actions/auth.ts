"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import {
  createUserSession,
  destroyCurrentSession,
  getTenantContext,
} from "@/lib/auth/session";
import {
  hashPassword,
  isNextControlFlowError,
  publicError,
  signupFailureMessage,
  slugifyCompany,
  verifyPassword,
} from "@/lib/auth/crypto";
import {
  parsePendingGoogleToken,
  pendingGoogleCookieName,
} from "@/lib/auth/oauth-state";
import { cookies } from "next/headers";
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
  let userId: string;

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
      userId = user.id;
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
      userId = user.id;
    }
  } catch (error) {
    if (isNextControlFlowError(error)) throw error;
    console.error("signUpAction", error);
    return publicError(signupFailureMessage(error));
  }

  await createUserSession(userId);
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

  let userId: string;
  try {
    const user = await prisma.user.findUnique({
      where: { email: parsed.data.email },
      include: { memberships: true },
    });
    if (!user || user.memberships.length === 0) {
      return publicError("Invalid email or password.");
    }
    if (!user.passwordHash) {
      return publicError("This account uses Google sign-in.");
    }
    const ok = await verifyPassword(parsed.data.password, user.passwordHash);
    if (!ok) {
      return publicError("Invalid email or password.");
    }
    userId = user.id;
  } catch (error) {
    if (isNextControlFlowError(error)) throw error;
    console.error("loginAction", error);
    return publicError("Could not sign you in. Try again.");
  }

  await createUserSession(userId);
  const next = String(formData.get("next") || "/dashboard");
  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";
  redirect(safeNext);
}

export async function completeGoogleSignUpAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const store = await cookies();
  const token = store.get(pendingGoogleCookieName)?.value;
  const profile = token ? parsePendingGoogleToken(token) : null;
  if (!profile) {
    return publicError("Your Google sign-in expired. Try again.");
  }

  const inviteToken = profile.inviteToken || String(formData.get("inviteToken") || "") || undefined;
  const companyName = String(formData.get("companyName") || "").trim();
  if (!inviteToken && companyName.length < 2) {
    return publicError("Enter a company name.");
  }

  let userId: string;
  try {
    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ googleId: profile.googleId }, { email: profile.email }],
      },
      include: { memberships: true },
    });
    if (existing?.memberships.length) {
      userId = existing.id;
    } else if (inviteToken) {
      const invite = await prisma.invite.findUnique({ where: { token: inviteToken } });
      if (!invite || invite.expiresAt < new Date()) {
        return publicError("This invite link is invalid or has expired.");
      }
      if (invite.email !== profile.email) {
        return publicError("Use the email address this invite was sent to.");
      }

      const user = existing
        ? await prisma.user.update({
            where: { id: existing.id },
            data: {
              googleId: profile.googleId,
              name: profile.name,
              image: profile.image,
              memberships: {
                create: {
                  companyId: invite.companyId,
                  role: invite.role === "ADMIN" ? "ADMIN" : "MEMBER",
                },
              },
            },
          })
        : await prisma.user.create({
            data: {
              name: profile.name,
              email: profile.email,
              googleId: profile.googleId,
              image: profile.image,
              memberships: {
                create: {
                  companyId: invite.companyId,
                  role: invite.role === "ADMIN" ? "ADMIN" : "MEMBER",
                },
              },
            },
          });
      await prisma.invite.delete({ where: { id: invite.id } });
      userId = user.id;
    } else {
      const company = await prisma.company.create({
        data: {
          name: companyName,
          slug: slugifyCompany(companyName),
        },
      });
      const user = existing
        ? await prisma.user.update({
            where: { id: existing.id },
            data: {
              googleId: profile.googleId,
              name: profile.name,
              image: profile.image,
              memberships: {
                create: { companyId: company.id, role: "ADMIN" },
              },
            },
          })
        : await prisma.user.create({
            data: {
              name: profile.name,
              email: profile.email,
              googleId: profile.googleId,
              image: profile.image,
              memberships: {
                create: { companyId: company.id, role: "ADMIN" },
              },
            },
          });
      userId = user.id;
    }
  } catch (error) {
    if (isNextControlFlowError(error)) throw error;
    console.error("completeGoogleSignUpAction", error);
    return publicError(signupFailureMessage(error));
  }

  store.set({ name: pendingGoogleCookieName, value: "", maxAge: 0, path: "/" });
  await createUserSession(userId);
  redirect("/dashboard");
}

export type FirebaseGoogleAuthResult =
  | { ok: true; redirectTo: string }
  | { ok: false; error: string };

export async function syncFirebaseGoogleSessionAction(input: {
  idToken: string;
  inviteToken?: string;
  next?: string;
}): Promise<FirebaseGoogleAuthResult> {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "Firebase API key is missing. Check NEXT_PUBLIC_FIREBASE_API_KEY." };
  }

  let verified: { uid: string; email: string; name: string; image?: string };
  try {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: input.idToken }),
      },
    );
    if (!res.ok) {
      return { ok: false, error: "Firebase token verification failed. Please try again." };
    }
    const data = (await res.json()) as {
      users?: Array<{
        localId: string;
        email?: string;
        displayName?: string;
        photoUrl?: string;
      }>;
    };
    const user = data.users?.[0];
    if (!user || !user.email) {
      return { ok: false, error: "No email associated with this Google account." };
    }
    verified = {
      uid: user.localId,
      email: user.email.toLowerCase(),
      name: user.displayName || user.email.split("@")[0],
      image: user.photoUrl || undefined,
    };
  } catch (err) {
    console.error("Firebase token verification error:", err);
    return { ok: false, error: "Could not verify Google authentication. Check network." };
  }

  const safeNext = input.next && input.next.startsWith("/") && !input.next.startsWith("//")
    ? input.next
    : "/dashboard";

  try {
    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ googleId: verified.uid }, { email: verified.email }],
      },
      include: { memberships: true },
    });

    if (existing && existing.memberships.length > 0) {
      if (!existing.googleId || (verified.image && existing.image !== verified.image)) {
        await prisma.user.update({
          where: { id: existing.id },
          data: {
            googleId: verified.uid,
            image: verified.image ?? existing.image,
          },
        });
      }
      await createUserSession(existing.id);
      return { ok: true, redirectTo: safeNext };
    }

    if (input.inviteToken) {
      const invite = await prisma.invite.findUnique({ where: { token: input.inviteToken } });
      if (!invite || invite.expiresAt < new Date()) {
        return { ok: false, error: "This invite link is invalid or has expired." };
      }
      if (invite.email.toLowerCase() !== verified.email) {
        return {
          ok: false,
          error: `This invite was sent to ${invite.email}. Please sign in with that Google account.`,
        };
      }

      const user = existing
        ? await prisma.user.update({
            where: { id: existing.id },
            data: {
              googleId: verified.uid,
              name: existing.name || verified.name,
              image: verified.image ?? existing.image,
              memberships: {
                create: {
                  companyId: invite.companyId,
                  role: invite.role === "ADMIN" ? "ADMIN" : "MEMBER",
                },
              },
            },
          })
        : await prisma.user.create({
            data: {
              name: verified.name,
              email: verified.email,
              googleId: verified.uid,
              image: verified.image,
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
      return { ok: true, redirectTo: "/dashboard" };
    }

    const pendingToken = createPendingGoogleToken({
      googleId: verified.uid,
      email: verified.email,
      name: verified.name,
      image: verified.image,
      inviteToken: input.inviteToken,
    });
    const store = await cookies();
    store.set(pendingGoogleCookieName, pendingToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 10,
    });
    return { ok: true, redirectTo: "/signup/google" };
  } catch (error) {
    if (isNextControlFlowError(error)) throw error;
    console.error("syncFirebaseGoogleSessionAction error:", error);
    return { ok: false, error: "Could not complete sign-in. Please try again." };
  }
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
