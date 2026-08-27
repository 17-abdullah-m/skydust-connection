"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLang } from "../components/LanguageProvider";

type Step = "methods" | "otp" | "done";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.85-.07-1.67-.21-2.46H12v4.66h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.56-5.17 3.56-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3c-1.08.73-2.47 1.17-4.07 1.17-3.13 0-5.78-2.11-6.73-4.96H1.27v3.09A12 12 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.31A7.21 7.21 0 0 1 4.89 12c0-.8.14-1.58.38-2.31V6.6H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.4l4-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.76 0 3.34.6 4.58 1.79l3.43-3.43C17.95 1.19 15.23 0 12 0 7.31 0 3.26 2.69 1.27 6.6l4 3.09C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path
        fill="currentColor"
        d="M24 12.07C24 5.42 18.63 0 12 0S0 5.42 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.79-4.7 4.54-4.7 1.32 0 2.7.24 2.7.24v2.98h-1.52c-1.5 0-1.97.93-1.97 1.89v2.26h3.34l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07z"
      />
    </svg>
  );
}

export function LoginForm() {
  const router = useRouter();
  const { lang } = useLang();
  const [step, setStep] = useState<Step>("methods");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [dial, setDial] = useState("+968");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [busy, setBusy] = useState<string | null>(null);

  const finish = () => {
    setStep("done");
    window.setTimeout(() => router.push("/"), 900);
  };

  const social = (provider: "google" | "facebook") => {
    setBusy(provider);
    window.setTimeout(() => finish(), 700);
  };

  if (step === "done") {
    return (
      <p className="mt-12 text-center text-sm text-neutral-500">
        {lang === "ar" ? "جارٍ تسجيل الدخول…" : "Signing you in…"}
      </p>
    );
  }

  if (step === "otp") {
    return (
      <form
        className="mt-8 space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          finish();
        }}
      >
        <p className="text-sm text-neutral-600">
          Enter the 6-digit code sent to{" "}
          <span className="font-medium text-neutral-900">
            {dial} {phone}
          </span>
        </p>
        <input
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          required
          value={otp}
          onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))}
          placeholder="••••••"
          className="w-full border border-neutral-300 px-4 py-3 text-center text-2xl tracking-[0.4em] outline-none focus:border-black"
        />
        <button
          type="submit"
          disabled={otp.length !== 6}
          className="w-full bg-black py-3 text-sm font-medium text-white disabled:opacity-40"
        >
          Continue
        </button>
        <button
          type="button"
          onClick={() => {
            setOtp("");
            setStep("methods");
          }}
          className="w-full text-sm text-neutral-500 hover:text-black"
        >
          Use a different number
        </button>
      </form>
    );
  }

  return (
    <div>
      <Image
        src="/skydust-wordmark.png"
        alt="SKYDUST"
        width={411}
        height={70}
        unoptimized
        className="mx-auto h-8 w-auto"
        style={{ width: "auto", height: 32 }}
      />
      <h1 className="mt-8 text-center text-2xl font-medium">
        {mode === "signup"
          ? lang === "ar"
            ? "إنشاء حساب"
            : "Create account"
          : lang === "ar"
            ? "تسجيل الدخول"
            : "Log in"}
      </h1>
      <div className="mt-8 space-y-3">
        <button
          type="button"
          disabled={!!busy}
          onClick={() => social("google")}
          className="flex w-full items-center justify-center gap-3 border border-neutral-300 bg-white py-3 text-sm font-medium text-neutral-800 transition hover:bg-neutral-50 disabled:opacity-60"
        >
          <GoogleIcon />
          {busy === "google" ? "Connecting…" : "Continue with Google"}
        </button>
        <button
          type="button"
          disabled={!!busy}
          onClick={() => social("facebook")}
          className="flex w-full items-center justify-center gap-3 bg-[#1877F2] py-3 text-sm font-medium text-white transition hover:bg-[#166fe0] disabled:opacity-60"
        >
          <FacebookIcon />
          {busy === "facebook" ? "Connecting…" : "Continue with Facebook"}
        </button>
      </div>

      <div className="my-7 flex items-center gap-3 text-[11px] tracking-[0.18em] text-neutral-400 uppercase">
        <span className="h-px flex-1 bg-neutral-200" />
        or
        <span className="h-px flex-1 bg-neutral-200" />
      </div>

      <form
        className="space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          if (phone.replace(/\D/g, "").length < 7) return;
          setStep("otp");
        }}
      >
        <label htmlFor="phone" className="text-sm text-neutral-700">
          Mobile number
        </label>
        <div className="flex border border-neutral-300 focus-within:border-black">
          <select
            value={dial}
            onChange={(event) => setDial(event.target.value)}
            aria-label="Country code"
            className="border-e border-neutral-300 bg-white px-3 text-sm outline-none"
          >
            <option value="+968">+968</option>
            <option value="+92">+92</option>
          </select>
          <input
            id="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="Phone number"
            className="min-w-0 flex-1 px-3 py-3 text-sm outline-none"
          />
        </div>
        <button type="submit" className="w-full bg-black py-3 text-sm font-medium text-white">
          Continue
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-neutral-500">
        {mode === "login" ? "New to SKYDUST?" : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="font-medium text-black underline underline-offset-4"
        >
          {mode === "login" ? "Sign up" : "Log in"}
        </button>
      </p>
      <p className="mt-6 text-center text-[11px] leading-5 text-neutral-400">
        By continuing, you agree to SKYDUST{" "}
        <Link href="/terms" className="underline">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
