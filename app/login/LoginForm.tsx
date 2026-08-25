"use client";

import { useState } from "react";

type Role = "admin" | "manager";

const copy: Record<
  Role,
  { title: string; hint: string; accent: string; button: string }
> = {
  admin: {
    title: "Admin login",
    hint: "Use your Cloudust administrator credentials.",
    accent: "text-[#c4a574]",
    button: "bg-[#c4a574] text-[#1a2a3a] hover:bg-[#d4b98a]",
  },
  manager: {
    title: "Manager login",
    hint: "Use your Cloudust manager credentials.",
    accent: "text-[#7eb0c9]",
    button: "bg-[#3d6b8c] text-white hover:bg-[#4a7fa3]",
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
        <label htmlFor="email" className="text-xs tracking-[0.18em] uppercase text-[#f4f0ea]/55">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-[#f4f0ea] outline-none ring-[#c4a574]/40 placeholder:text-[#f4f0ea]/30 focus:ring-2"
          placeholder="you@skydust.connection"
        />
      </div>
      <div>
        <label htmlFor="password" className="text-xs tracking-[0.18em] uppercase text-[#f4f0ea]/55">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-[#f4f0ea] outline-none ring-[#c4a574]/40 placeholder:text-[#f4f0ea]/30 focus:ring-2"
          placeholder="••••••••"
        />
      </div>
      <button
        type="submit"
        className={`mt-2 w-full rounded-xl px-4 py-3 text-sm font-semibold tracking-wide transition ${ui.button}`}
      >
        Sign in
      </button>
      {submitted ? (
        <p className={`text-center text-sm ${ui.accent}`}>
          {ui.title} is ready. Authentication can be wired next.
        </p>
      ) : (
        <p className="text-center text-sm text-[#f4f0ea]/45">{ui.hint}</p>
      )}
    </form>
  );
}
