import Link from "next/link";
import { SiteHeader } from "../../components/SiteChrome";
import { LoginForm } from "../LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col bg-[#f7f4ee] text-[#1c2430]">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-12">
        <p className="text-xs font-medium tracking-[0.3em] text-[#7eb89a] uppercase">
          Company tenant
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold">Admin login</h1>
        <p className="mt-2 text-sm text-[#1c2430]/60">
          Sign in to own devices, billing, and Manager seats.
        </p>
        <LoginForm role="admin" />
        <p className="mt-8 text-center text-sm text-[#1c2430]/45">
          Not an admin?{" "}
          <Link href="/login/manager" className="text-[#7eb89a] hover:underline">
            Manager login
          </Link>
          {" · "}
          <Link href="/get-started" className="text-[#7eb89a] hover:underline">
            Get started
          </Link>
        </p>
      </main>
    </div>
  );
}
