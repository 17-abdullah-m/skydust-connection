import { NextResponse } from "next/server";
import { buildGoogleAuthUrl, isGoogleAuthConfigured } from "@/lib/auth/google";
import { createOAuthState } from "@/lib/auth/oauth-state";

export function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("mode") === "signup" ? "signup" : "login";
  const next = url.searchParams.get("next") || undefined;
  const invite = url.searchParams.get("invite") || undefined;

  if (!isGoogleAuthConfigured()) {
    const fallbackPath = mode === "signup" ? "/signup" : "/login";
    const redirectUrl = new URL(fallbackPath, request.url);
    redirectUrl.searchParams.set("error", "google_not_configured");
    if (invite) redirectUrl.searchParams.set("invite", invite);
    return NextResponse.redirect(redirectUrl);
  }

  const state = createOAuthState({ mode, next, inviteToken: invite });

  return NextResponse.redirect(buildGoogleAuthUrl(state));
}
