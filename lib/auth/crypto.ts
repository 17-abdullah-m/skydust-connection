import { createHash, randomBytes } from "crypto";
import bcrypt from "bcryptjs";

const COOKIE = "skydust_session";
const SESSION_DAYS = 14;
const DEV_SECRET = "skydust-dev-auth-secret-change-me";

export function sessionCookieName() {
  return COOKIE;
}

export function sessionMaxAgeSeconds() {
  return SESSION_DAYS * 24 * 60 * 60;
}

export function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function createSessionToken() {
  return randomBytes(32).toString("hex");
}

function authSecret() {
  return process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || DEV_SECRET;
}

export function hashSessionToken(token: string) {
  return createHash("sha256").update(`${authSecret()}:${token}`).digest("hex");
}

export function slugifyCompany(name: string) {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  const suffix = randomBytes(3).toString("hex");
  return `${base || "company"}-${suffix}`;
}

export function publicError(message: string) {
  return { error: message };
}

export function isNextControlFlowError(error: unknown) {
  if (typeof error !== "object" || error === null || !("digest" in error)) return false;
  const digest = String((error as { digest?: unknown }).digest ?? "");
  return digest.startsWith("NEXT_REDIRECT") || digest.startsWith("NEXT_NOT_FOUND");
}

export function signupFailureMessage(error: unknown) {
  const code =
    typeof error === "object" && error !== null && "code" in error
      ? String((error as { code?: unknown }).code)
      : "";
  if (code === "P2002") return "An account with this email already exists.";
  if (code === "P1003" || code === "P1001" || code === "P1010") {
    return "Database is not ready. Try again in a moment.";
  }
  return "Could not create your account. Try again.";
}
