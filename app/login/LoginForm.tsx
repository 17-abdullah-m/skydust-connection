"use client";

import { useState } from "react";

type Role = "admin" | "manager";

const copy: Record<Role, { title: string; hint: string }> = {
  admin: {
    title: "Admin login",
    hint: "Company tenant owner — devices, billing, manager invites.",
  },
  manager: {
    title: "Manager login",
    hint: "Invited seat — rooms, refills, and status.",
  },
};

export function LoginForm({ role }: { role: Role }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const ui = copy[role];

  return (
    <form
      className="mt-10 space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div>
        <label htmlFor="email" className="text-xs tracking-[0.18em] uppercase text-[#1c2430]/45">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 w-full rounded-xl border border-[#1c2430]/12 bg-white px-4 py-3 text-sm outline-none ring-[#7eb89a]/40 placeholder:text-[#1c2430]/30 focus:ring-2"
          placeholder="you@company.com"
        />
      </div>
      <div>
        <label htmlFor="password" className="text-xs tracking-[0.18em] uppercase text-[#1c2430]/45">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 w-full rounded-xl border border-[#1c2430]/12 bg-white px-4 py-3 text-sm outline-none ring-[#7eb89a]/40 placeholder:text-[#1c2430]/30 focus:ring-2"
          placeholder="••••••••"
        />
      </div>
      <button
        type="submit"
        className="mt-2 w-full rounded-xl bg-[#1c2430] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#2c3848]"
      >
        Sign in
      </button>
      {submitted ? (
        <p className="text-center text-sm text-[#7eb89a]">{ui.title} is ready to connect to Firebase.</p>
      ) : (
        <p className="text-center text-sm text-[#1c2430]/45">{ui.hint}</p>
      )}
    </form>
  );
}
