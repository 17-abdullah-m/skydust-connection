import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { GetStartedForm } from "./GetStartedForm";

export default function GetStartedPage() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col bg-[#f7f4ee] text-[#1c2430]">
      <SiteHeader />
      <main className="mx-auto w-full max-w-lg flex-1 px-5 py-12 sm:px-10">
        <p className="text-xs tracking-[0.28em] text-[#7eb89a] uppercase">
          Start your tenant
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold">Get started</h1>
        <p className="mt-3 text-sm leading-6 text-[#1c2430]/65">
          Sign up as Admin. Your company name becomes the Cloudust tenant.
          Invite Managers after the workspace exists.
        </p>
        <GetStartedForm />
      </main>
      <SiteFooter />
    </div>
  );
}
