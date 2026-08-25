import Link from "next/link";
import { SiteHeader } from "../components/SiteChrome";

export default function LoginChooserPage() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col bg-[#f7f4ee] text-[#1c2430]">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-5 py-16 sm:px-10">
        <p className="text-xs tracking-[0.28em] text-[#7eb89a] uppercase">
          Cloudust access
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold">Choose your login</h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-[#1c2430]/65">
          Admin owns the company tenant. Managers are invited. New here?{" "}
          <Link href="/get-started" className="text-[#7eb89a] hover:underline">
            Get started
          </Link>
          .
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <Link
            href="/login/admin"
            className="rounded-2xl border border-[#1c2430]/8 bg-white p-7 hover:border-[#7eb89a]"
          >
            <h2 className="font-display text-2xl font-semibold">Admin login</h2>
            <p className="mt-2 text-sm text-[#1c2430]/60">Tenant, billing, manager invites.</p>
          </Link>
          <Link
            href="/login/manager"
            className="rounded-2xl border border-[#1c2430]/8 bg-white p-7 hover:border-[#7eb89a]"
          >
            <h2 className="font-display text-2xl font-semibold">Manager login</h2>
            <p className="mt-2 text-sm text-[#1c2430]/60">Rooms, refills, and status.</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
