import { createHash, randomBytes } from "crypto";
import bcrypt from "bcryptjs";

const COOKIE = "skydust_session";
const SESSION_DAYS = 14;

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

export function hashSessionToken(token: string) {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("Missing AUTH_SECRET");
  }
  return createHash("sha256").update(`${secret}:${token}`).digest("hex");
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
