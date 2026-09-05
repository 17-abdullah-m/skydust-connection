"use client";

import { useActionState } from "react";
import Link from "next/link";
import { completeGoogleSignUpAction, type AuthState } from "@/app/actions/auth";

const initial: AuthState = {};

export function GoogleSignUpForm({
  name,
  email,
  inviteToken,
}: {
  name: string;
  email: string;
  inviteToken?: string;
}) {
  const [state, action, pending] = useActionState(completeGoogleSignUpAction, initial);
  const joining = Boolean(inviteToken);

  return (
    <form action={action} className="mt-8 space-y-5">
      <div className="rounded border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm">
        <p className="font-medium text-neutral-900">{name}</p>
        <p className="text-neutral-500">{email}</p>
      </div>
      {inviteToken ? <input type="hidden" name="inviteToken" value={inviteToken} /> : null}
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
        <Link href="/login" className="font-medium text-black underline underline-offset-4">
          Back to log in
        </Link>
      </p>
    </form>
  );
}
