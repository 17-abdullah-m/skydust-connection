import Link from "next/link";
import { SiteHeader } from "../components/SiteChrome";

export default function LoginChooserPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-white text-neutral-900">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-5 py-16">
        <h1 className="text-3xl font-medium">Log in</h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-neutral-600">
          Admin owns the company workspace. Managers are invited.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Link href="/login/admin" className="border border-neutral-200 p-7 hover:border-black">
            <h2 className="text-xl font-medium">Admin login</h2>
            <p className="mt-2 text-sm text-neutral-600">Workspace, billing, manager invites.</p>
          </Link>
          <Link href="/login/manager" className="border border-neutral-200 p-7 hover:border-black">
            <h2 className="text-xl font-medium">Manager login</h2>
            <p className="mt-2 text-sm text-neutral-600">Rooms, refills, and status.</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
