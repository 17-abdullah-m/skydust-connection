import { createHmac, randomBytes, timingSafeEqual } from "crypto";

type OAuthStatePayload = {
  next: string;
  mode: "login" | "signup";
  inviteToken?: string;
  nonce: string;
};

function authSecret() {
  return process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "skydust-dev-auth-secret-change-me";
}

function sign(data: string) {
  return createHmac("sha256", authSecret()).update(data).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function createOAuthState(input: {
  next?: string;
  mode: "login" | "signup";
  inviteToken?: string;
}) {
  const payload: OAuthStatePayload = {
    next: sanitizeNext(input.next),
    mode: input.mode,
    inviteToken: input.inviteToken,
    nonce: randomBytes(16).toString("hex"),
  };
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${data}.${sign(data)}`;
}

export function parseOAuthState(state: string) {
  const [data, signature] = state.split(".");
  if (!data || !signature || !safeEqual(sign(data), signature)) return null;
  try {
    const payload = JSON.parse(Buffer.from(data, "base64url").toString("utf8")) as OAuthStatePayload;
    if (!payload.nonce || !payload.mode) return null;
    return {
      ...payload,
      next: sanitizeNext(payload.next),
    };
  } catch {
    return null;
  }
}

export type PendingGoogleProfile = {
  googleId: string;
  email: string;
  name: string;
  image?: string;
  inviteToken?: string;
};

export function createPendingGoogleToken(profile: PendingGoogleProfile) {
  const data = Buffer.from(JSON.stringify(profile)).toString("base64url");
  return `${data}.${sign(data)}`;
}

export function parsePendingGoogleToken(token: string) {
  const [data, signature] = token.split(".");
  if (!data || !signature || !safeEqual(sign(data), signature)) return null;
  try {
    return JSON.parse(Buffer.from(data, "base64url").toString("utf8")) as PendingGoogleProfile;
  } catch {
    return null;
  }
}

export function sanitizeNext(next?: string | null) {
  if (!next || !next.startsWith("/") || next.startsWith("//")) return "/dashboard";
  return next;
}

export function appOrigin() {
  const configured = process.env.APP_URL?.replace(/\/$/, "");
  if (configured) return configured;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export function googleRedirectUri() {
  return `${appOrigin()}/api/auth/google/callback`;
}

export const pendingGoogleCookieName = "skydust_google_pending";
