import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { GetStartedForm } from "./GetStartedForm";

export default function GetStartedPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-white text-neutral-900">
      <SiteHeader />
      <main className="mx-auto w-full max-w-lg flex-1 px-5 py-12">
        <p className="text-xs tracking-[0.28em] text-neutral-500 uppercase">
          Scenting appointment
        </p>
        <h1 className="mt-3 text-4xl font-medium">Book an appointment</h1>
        <p className="mt-3 text-sm leading-6 text-neutral-600">
          Tell us your space. A SKYDUST specialist will plan machines, oils,
          and a refill schedule.
        </p>
        <GetStartedForm />
      </main>
      <SiteFooter />
    </div>
  );
}
