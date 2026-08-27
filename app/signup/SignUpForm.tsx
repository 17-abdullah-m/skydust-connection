"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signUpAction, type AuthState } from "@/app/actions/auth";

const initial: AuthState = {};

export function SignUpForm({ inviteToken, inviteEmail }: { inviteToken?: string; inviteEmail?: string }) {
  const [state, action, pending] = useActionState(signUpAction, initial);
  const joining = Boolean(inviteToken);

  return (
    <form action={action} className="mt-8 space-y-5">
      {inviteToken ? <input type="hidden" name="inviteToken" value={inviteToken} /> : null}
      <div>
        <label htmlFor="name" className="text-sm text-neutral-700">
          Full name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="mt-2 w-full border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-black"
        />
      </div>
      <div>
        <label htmlFor="email" className="text-sm text-neutral-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          defaultValue={inviteEmail}
          readOnly={Boolean(inviteEmail)}
          autoComplete="email"
          className="mt-2 w-full border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-black read-only:bg-neutral-50"
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
          minLength={8}
          autoComplete="new-password"
          className="mt-2 w-full border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-black"
        />
        <p className="mt-1 text-xs text-neutral-400">At least 8 characters.</p>
      </div>
      {joining ? null : (
        <div>
          <label htmlFor="companyName" className="text-sm text-neutral-700">
            Company name
          </label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            required
            autoComplete="organization"
            className="mt-2 w-full border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-black"
          />
        </div>
      )}
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
        {pending ? "Creating account…" : joining ? "Join company" : "Create company account"}
      </button>
      <p className="text-center text-sm text-neutral-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-black underline underline-offset-4">
          Log in
        </Link>
      </p>
    </form>
  );
}
