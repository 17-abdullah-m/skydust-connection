import Link from "next/link";
import { LoginForm } from "../LoginForm";

export default function ManagerLoginPage() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col bg-[#1a2a3a] text-[#f4f0ea]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% -15%, rgba(61,107,140,0.45), transparent 55%)",
        }}
      />
      <header className="relative z-10 px-6 py-6 sm:px-10">
        <Link href="/" className="text-sm text-[#9ec4d6] hover:underline">
          ← Cloudust
        </Link>
      </header>
      <main className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 pb-16">
        <p className="text-xs font-medium tracking-[0.3em] text-[#9ec4d6] uppercase">
          Skydust Connection
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold">
          Manager login
        </h1>
        <p className="mt-2 text-sm text-[#f4f0ea]/65">
          Manager access to Cloudust operations.
        </p>
        <LoginForm role="manager" />
        <p className="mt-8 text-center text-sm text-[#f4f0ea]/45">
          Not a manager?{" "}
          <Link href="/login/admin" className="text-[#c4a574] hover:underline">
            Admin login
          </Link>
          {" · "}
          <Link href="/get-started" className="text-[#c4a574] hover:underline">
            Get started
          </Link>
        </p>
      </main>
    </div>
  );
}
