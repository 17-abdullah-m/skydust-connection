import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { exchangeGoogleCode, fetchGoogleProfile } from "@/lib/auth/google";
import {
  createPendingGoogleToken,
  parseOAuthState,
  pendingGoogleCookieName,
} from "@/lib/auth/oauth-state";
import { createUserSession } from "@/lib/auth/session";

function redirectWithError(
  request: Request,
  code: string,
  mode: "login" | "signup" = "login",
  inviteToken?: string,
) {
  const path = mode === "signup" ? "/signup" : "/login";
  const url = new URL(path, request.url);
  url.searchParams.set("error", code);
  if (inviteToken) url.searchParams.set("invite", inviteToken);
  return NextResponse.redirect(url);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const stateParam = url.searchParams.get("state");
  const parsedState = stateParam ? parseOAuthState(stateParam) : null;
  const mode = parsedState?.mode || "login";
  const inviteToken = parsedState?.inviteToken;

  const error = url.searchParams.get("error");
  if (error) {
    return redirectWithError(request, "google_denied", mode, inviteToken);
  }

  const code = url.searchParams.get("code");
  if (!code || !parsedState) {
    return redirectWithError(request, "google_invalid", mode, inviteToken);
  }

  try {
    const accessToken = await exchangeGoogleCode(code);
    const profile = await fetchGoogleProfile(accessToken);
    const email = profile.email.toLowerCase();

    const existing =
      (await prisma.user.findUnique({
        where: { googleId: profile.sub },
        include: { memberships: true },
      })) ||
      (await prisma.user.findUnique({
        where: { email },
        include: { memberships: true },
      }));

    if (existing) {
      if (!existing.googleId) {
        await prisma.user.update({
          where: { id: existing.id },
          data: {
            googleId: profile.sub,
            image: profile.picture ?? existing.image,
          },
        });
      }

      if (existing.memberships.length === 0) {
        const token = createPendingGoogleToken({
          googleId: profile.sub,
          email,
          name: profile.name,
          image: profile.picture,
          inviteToken: parsedState.inviteToken,
        });
        const response = NextResponse.redirect(new URL("/signup/google", request.url));
        response.cookies.set(pendingGoogleCookieName, token, {
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          path: "/",
          maxAge: 60 * 10,
        });
        return response;
      }

      await createUserSession(existing.id);
      return NextResponse.redirect(new URL(parsedState.next, request.url));
    }

    const token = createPendingGoogleToken({
      googleId: profile.sub,
      email,
      name: profile.name,
      image: profile.picture,
      inviteToken: parsedState.inviteToken,
    });
    const response = NextResponse.redirect(new URL("/signup/google", request.url));
    response.cookies.set(pendingGoogleCookieName, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 10,
    });
    return response;
  } catch (err) {
    console.error("google callback", err);
    return redirectWithError(request, "google_failed", mode, inviteToken);
  }
}
