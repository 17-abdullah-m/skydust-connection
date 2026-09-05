"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction, type AuthState } from "@/app/actions/auth";
import { useSearchParams } from "next/navigation";
import { AuthDivider, GoogleSignInButton } from "../components/GoogleSignInButton";

const initial: AuthState = {};

const googleErrors: Record<string, string> = {
  google_not_configured: "Google sign-in is not configured yet.",
  google_denied: "Google sign-in was cancelled.",
  google_invalid: "Google sign-in failed. Try again.",
  google_failed: "Google sign-in failed. Try again.",
};

export function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/dashboard";
  const googleError = googleErrors[searchParams.get("error") || ""] || null;
  const [state, action, pending] = useActionState(loginAction, initial);

  return (
    <div className="mt-8 space-y-5">
      <GoogleSignInButton mode="login" next={next} label="Sign in with Google" />
      <AuthDivider />
      <form action={action} className="space-y-5">
      <input type="hidden" name="next" value={next} />
      <div>
        <label htmlFor="email" className="text-sm text-neutral-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-2 w-full border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-black"
        />
      </div>
      <div>
        <label htmlFor="password" className="text-sm text-neutral-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-2 w-full border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-black"
        />
      </div>
      {googleError ? (
        <p className="text-sm text-red-600" role="alert">
          {googleError}
        </p>
      ) : null}
      {state.error ? (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full bg-black py-3 text-sm font-medium text-white disabled:opacity-50"
      >
        {pending ? "Signing in…" : "Log in"}
      </button>
      <p className="text-center text-sm text-neutral-500">
        New to SKYDUST?{" "}
        <Link href="/signup" className="font-medium text-black underline underline-offset-4">
          Create a company account
        </Link>
      </p>
      </form>
    </div>
  );
}
