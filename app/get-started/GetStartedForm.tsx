"use client";

import Link from "next/link";
import { useState } from "react";

export function GetStartedForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="mt-10 rounded-2xl border border-[#c4a574]/40 bg-[#c4a574]/10 p-6 text-center">
        <p className="font-display text-2xl font-semibold">Workspace queued</p>
        <p className="mt-3 text-sm leading-6 text-[#f4f0ea]/70">
          Your Cloudust trial request is in. Next we will wire this form to
          create the Admin workspace and send the invite.
        </p>
        <Link
          href="/login/admin"
          className="mt-6 inline-flex text-sm font-medium text-[#c4a574]"
        >
          Go to Admin login →
        </Link>
      </div>
    );
  }

  return (
    <form
      className="mt-10 space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" id="name" type="text" autoComplete="name" />
        <Field
          label="Work email"
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
        />
      </div>
      <Field
        label="Company / workspace name"
        id="company"
        type="text"
        autoComplete="organization"
        placeholder="Skydust Connection"
      />
      <div>
        <p className="text-xs tracking-[0.18em] uppercase text-[#f4f0ea]/55">
          Your seat
        </p>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/15 bg-white/5 p-4 has-[:checked]:border-[#c4a574]/70">
            <input
              type="radio"
              name="seat"
              value="admin"
              defaultChecked
              className="mt-1"
            />
            <span>
              <span className="block text-sm font-medium">Admin</span>
              <span className="mt-1 block text-xs text-[#f4f0ea]/55">
                I will own the workspace and invite managers.
              </span>
            </span>
          </label>
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/15 bg-white/5 p-4 has-[:checked]:border-[#7eb0c9]/70">
            <input type="radio" name="seat" value="manager" className="mt-1" />
            <span>
              <span className="block text-sm font-medium">Manager</span>
              <span className="mt-1 block text-xs text-[#f4f0ea]/55">
                I was invited — I need a Manager seat.
              </span>
            </span>
          </label>
        </div>
      </div>
      <Field
        label="Password"
        id="password"
        type="password"
        autoComplete="new-password"
      />
      <button
        type="submit"
        className="w-full rounded-xl bg-[#c4a574] px-4 py-3 text-sm font-semibold text-[#1a2a3a] transition hover:bg-[#d4b98a]"
      >
        Create my Cloudust workspace
      </button>
      <p className="text-center text-sm text-[#f4f0ea]/45">
        Already have access?{" "}
        <Link href="/login" className="text-[#c4a574] hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}

function Field({
  label,
  id,
  type,
  autoComplete,
  placeholder,
}: {
  label: string;
  id: string;
  type: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-xs tracking-[0.18em] uppercase text-[#f4f0ea]/55">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-[#f4f0ea] outline-none ring-[#c4a574]/40 placeholder:text-[#f4f0ea]/30 focus:ring-2"
      />
    </div>
  );
}
