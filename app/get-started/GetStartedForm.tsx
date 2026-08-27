"use client";

import Link from "next/link";
import { useActionState } from "react";
import { createAppointmentAction, type AppointmentState } from "@/app/actions/appointments";

const initial: AppointmentState = {};

export function GetStartedForm() {
  const [state, action, pending] = useActionState(createAppointmentAction, initial);

  if (state.ok) {
    return (
      <div className="mt-10 border border-neutral-200 p-6 text-center">
        <p className="text-xl font-medium">Request received</p>
        <p className="mt-3 text-sm leading-6 text-neutral-600">
          A SKYDUST specialist will follow up. If you have a company account, this also
          appears on your dashboard.
        </p>
        <Link href="/dashboard" className="mt-6 inline-flex text-sm underline underline-offset-4">
          Go to dashboard
        </Link>
      </div>
    );
  }

  return (
    <form action={action} className="mt-10 space-y-5">
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
        label="Company or space name"
        id="companyName"
        type="text"
        autoComplete="organization"
        placeholder="Your company"
      />
      <div>
        <label htmlFor="notes" className="text-xs tracking-[0.18em] text-neutral-500 uppercase">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          className="mt-2 w-full border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-black"
          placeholder="Rooms, hotels, cars — whatever we should scent."
        />
      </div>
      {state.error ? (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full bg-black px-4 py-3 text-sm font-medium text-white disabled:opacity-50"
      >
        {pending ? "Sending…" : "Request an appointment"}
      </button>
      <p className="text-center text-sm text-neutral-500">
        Want a company workspace?{" "}
        <Link href="/signup" className="underline underline-offset-4">
          Sign up
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
      <label htmlFor={id} className="text-xs tracking-[0.18em] text-neutral-500 uppercase">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="mt-2 w-full border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-black"
      />
    </div>
  );
}
