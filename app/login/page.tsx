import Link from "next/link";
import { SiteHeader } from "../components/SiteChrome";

export default function LoginChooserPage() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col bg-[#1a2a3a] text-[#f4f0ea]">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-5 py-16 sm:px-10">
        <p className="text-xs tracking-[0.28em] text-[#c4a574] uppercase">
          Cloudust access
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold">
          Choose your login
        </h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-[#f4f0ea]/65">
          Use the portal that matches your seat. New to Cloudust?{" "}
          <Link href="/get-started" className="text-[#c4a574] hover:underline">
            Get started
          </Link>
          .
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <Link
            href="/login/admin"
            className="rounded-2xl border border-white/10 bg-white/5 p-7 hover:border-[#c4a574]/50"
          >
            <h2 className="font-display text-2xl font-semibold">Admin login</h2>
            <p className="mt-2 text-sm text-[#f4f0ea]/65">
              Workspace, billing, and settings.
            </p>
          </Link>
          <Link
            href="/login/manager"
            className="rounded-2xl border border-white/10 bg-white/5 p-7 hover:border-[#7eb0c9]/50"
          >
            <h2 className="font-display text-2xl font-semibold">Manager login</h2>
            <p className="mt-2 text-sm text-[#f4f0ea]/65">
              Assignments and daily operations.
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}
