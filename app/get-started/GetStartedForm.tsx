"use client";

import Link from "next/link";
import { useState } from "react";

export function GetStartedForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="mt-10 rounded-2xl border border-[#7eb89a]/40 bg-[#f3faf6] p-6 text-center">
        <p className="font-display text-2xl font-semibold">Tenant queued</p>
        <p className="mt-3 text-sm leading-6 text-[#1c2430]/65">
          Your request is in. Next, log in with Google, Facebook, or your phone
          number.
        </p>
        <Link href="/login" className="mt-6 inline-flex text-sm font-medium text-[#7eb89a]">
          Go to login →
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
        label="Company name (tenant ID)"
        id="company"
        type="text"
        autoComplete="organization"
        placeholder="Your company"
      />
      <div>
        <p className="text-xs tracking-[0.18em] uppercase text-[#1c2430]/45">
          Your seat
        </p>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#1c2430]/10 bg-white p-4 has-[:checked]:border-[#7eb89a]">
            <input type="radio" name="seat" value="admin" defaultChecked className="mt-1" />
            <span>
              <span className="block text-sm font-medium">Admin</span>
              <span className="mt-1 block text-xs text-[#1c2430]/50">
                I own the company tenant and invite managers.
              </span>
            </span>
          </label>
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#1c2430]/10 bg-white p-4 has-[:checked]:border-[#7eb89a]">
            <input type="radio" name="seat" value="manager" className="mt-1" />
            <span>
              <span className="block text-sm font-medium">Manager</span>
              <span className="mt-1 block text-xs text-[#1c2430]/50">
                I was invited — I need Manager access.
              </span>
            </span>
          </label>
        </div>
      </div>
      <Field label="Password" id="password" type="password" autoComplete="new-password" />
      <button
        type="submit"
        className="w-full rounded-xl bg-[#1c2430] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#2c3848]"
      >
        Create my SKYDUST workspace
      </button>
      <p className="text-center text-sm text-[#1c2430]/45">
        Already have access?{" "}
        <Link href="/login" className="text-[#7eb89a] hover:underline">
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
      <label htmlFor={id} className="text-xs tracking-[0.18em] uppercase text-[#1c2430]/45">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-[#1c2430]/12 bg-white px-4 py-3 text-sm text-[#1c2430] outline-none ring-[#7eb89a]/40 placeholder:text-[#1c2430]/30 focus:ring-2"
      />
    </div>
  );
}
