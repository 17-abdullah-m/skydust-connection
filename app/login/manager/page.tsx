import Link from "next/link";
import { SiteHeader } from "../../components/SiteChrome";
import { LoginForm } from "../LoginForm";

export default function ManagerLoginPage() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col bg-[#f7f4ee] text-[#1c2430]">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-12">
        <p className="text-xs font-medium tracking-[0.3em] text-[#7eb89a] uppercase">
          Room operations
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold">Manager login</h1>
        <p className="mt-2 text-sm text-[#1c2430]/60">
          Sign in if your Admin invited you to this tenant.
        </p>
        <LoginForm role="manager" />
        <p className="mt-8 text-center text-sm text-[#1c2430]/45">
          Not a manager?{" "}
          <Link href="/login/admin" className="text-[#7eb89a] hover:underline">
            Admin login
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
