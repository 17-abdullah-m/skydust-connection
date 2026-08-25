import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { GetStartedForm } from "./GetStartedForm";

export default function GetStartedPage() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col bg-[#1a2a3a] text-[#f4f0ea]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% -15%, rgba(196,165,116,0.28), transparent 55%)",
        }}
      />
      <SiteHeader />
      <main className="relative z-10 mx-auto w-full max-w-lg flex-1 px-5 py-12 sm:px-10">
        <p className="text-xs tracking-[0.28em] text-[#c4a574] uppercase">
          Start your trial
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold">Get started</h1>
        <p className="mt-3 text-sm leading-6 text-[#f4f0ea]/70">
          Open a Cloudust workspace for Skydust Connection operations. Admins
          create the account. Managers join after they are invited.
        </p>
        <GetStartedForm />
      </main>
      <SiteFooter />
    </div>
  );
}
