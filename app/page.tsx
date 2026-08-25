import Link from "next/link";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";

const features = [
  {
    title: "One workspace, two seats",
    body: "Admins own the account. Managers run the floor. Cloudust keeps those lanes clear so work does not stall in a shared inbox.",
  },
  {
    title: "Live connection view",
    body: "See who is assigned, what is waiting, and which threads need a decision — without exporting another spreadsheet.",
  },
  {
    title: "Role-safe access",
    body: "Billing, users, and system settings stay with Admin. Day-to-day assignments stay with Manager. No accidental overwrite.",
  },
  {
    title: "Handoffs that stick",
    body: "Notes, status, and next action travel with every connection so a shift change does not reset the story.",
  },
  {
    title: "Audit without extra tools",
    body: "Every seat action is timestamped. When something moved, you can see who moved it.",
  },
  {
    title: "Ready for your stack",
    body: "Start in the browser today. Bring your teams in when you are ready — no on-prem install.",
  },
];

const steps = [
  {
    n: "01",
    title: "Create the workspace",
    body: "Get started, name the account, and pick the Admin who owns Cloudust for your company.",
  },
  {
    n: "02",
    title: "Invite managers",
    body: "Add the people who run daily connections. They log in on the Manager portal — not the Admin one.",
  },
  {
    n: "03",
    title: "Run the day",
    body: "Assignments, status, and handoffs live in one place. You only come back to pricing when you grow seats.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$29",
    note: "per workspace / month",
    points: ["1 Admin seat", "3 Manager seats", "Connection board", "Email support"],
    featured: false,
  },
  {
    name: "Growth",
    price: "$79",
    note: "per workspace / month",
    points: [
      "3 Admin seats",
      "15 Manager seats",
      "Handoffs & audit log",
      "Priority support",
    ],
    featured: true,
  },
  {
    name: "Scale",
    price: "Custom",
    note: "annual contract",
    points: ["Unlimited seats", "SSO & roles", "Dedicated onboarding", "SLA"],
    featured: false,
  },
];

const faqs = [
  {
    q: "What is Cloudust?",
    a: "Cloudust is the SaaS product of Skydust Connection. It is the workspace where Admins configure the account and Managers run daily operations.",
  },
  {
    q: "Why two logins?",
    a: "Admin and Manager are different jobs. Separate portals keep settings, billing, and system control away from the live operations board.",
  },
  {
    q: "Can I try before I pay?",
    a: "Yes. Get started opens a workspace trial. You can invite a manager and run a real week of connections before you pick a plan.",
  },
  {
    q: "Who should click Get started?",
    a: "The person who will own the account — typically the Admin. Managers are invited after the workspace exists.",
  },
];

export default function Home() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col bg-[#1a2a3a] text-[#f4f0ea]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[42rem]"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(196,165,116,0.28), transparent 55%), radial-gradient(ellipse 50% 40% at 100% 20%, rgba(61,107,140,0.4), transparent 50%)",
        }}
      />

      <SiteHeader />

      <main className="relative z-10">
        <section className="mx-auto max-w-6xl px-5 pb-20 pt-10 sm:px-10 sm:pt-16">
          <p className="text-xs font-medium tracking-[0.35em] text-[#c4a574] uppercase">
            SaaS by Skydust Connection
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
            Run connections without mixing the control room and the floor.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#f4f0ea]/75">
            Cloudust is the named product for teams that need a clean split:
            Admins own the system, Managers own the day. One workspace. Two
            doors.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/get-started"
              className="rounded-full bg-[#c4a574] px-7 py-3 text-sm font-semibold text-[#1a2a3a] transition hover:bg-[#d4b98a]"
            >
              Get started
            </Link>
            <a
              href="#pricing"
              className="rounded-full border border-white/15 px-7 py-3 text-sm font-medium text-[#f4f0ea]/85 hover:border-white/30"
            >
              See pricing
            </a>
          </div>
          <p className="mt-4 text-sm text-[#f4f0ea]/45">
            Trial workspace · No card required to begin · Invite managers when
            you are ready
          </p>
        </section>

        <section className="border-y border-white/10 bg-black/15">
          <div className="mx-auto grid max-w-6xl gap-6 px-5 py-8 text-center text-xs tracking-[0.18em] text-[#f4f0ea]/40 uppercase sm:grid-cols-3 sm:px-10">
            <p>Built for two-role teams</p>
            <p>Browser-native SaaS</p>
            <p>Admin + Manager portals</p>
          </div>
        </section>

        <section id="product" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-10">
          <p className="text-xs tracking-[0.28em] text-[#c4a574] uppercase">
            Product
          </p>
          <h2 className="font-display mt-3 max-w-2xl text-4xl font-semibold">
            The funnel is simple: start a workspace, then run the work.
          </h2>
          <p className="mt-4 max-w-2xl text-[#f4f0ea]/70">
            Cloudust is not a generic dashboard kit. It is the operating layer
            Skydust Connection ships as software — for companies that already
            know who is Admin and who is Manager.
          </p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className="font-display text-2xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#f4f0ea]/70">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="how" className="bg-[#152230] px-5 py-20 sm:px-10">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs tracking-[0.28em] text-[#c4a574] uppercase">
              How it works
            </p>
            <h2 className="font-display mt-3 text-4xl font-semibold">
              Three steps from visitor to live workspace.
            </h2>
            <ol className="mt-12 grid gap-8 sm:grid-cols-3">
              {steps.map((step) => (
                <li key={step.n}>
                  <p className="font-display text-3xl text-[#c4a574]">{step.n}</p>
                  <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#f4f0ea]/65">{step.body}</p>
                </li>
              ))}
            </ol>
            <Link
              href="/get-started"
              className="mt-12 inline-flex rounded-full bg-[#c4a574] px-7 py-3 text-sm font-semibold text-[#1a2a3a] hover:bg-[#d4b98a]"
            >
              Get started
            </Link>
          </div>
        </section>

        <section id="roles" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-10">
          <p className="text-xs tracking-[0.28em] text-[#c4a574] uppercase">
            Access
          </p>
          <h2 className="font-display mt-3 text-4xl font-semibold">
            Already on Cloudust? Use the door for your seat.
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-white/5 p-7">
              <p className="text-xs tracking-[0.2em] text-[#c4a574] uppercase">
                Seat one
              </p>
              <h3 className="font-display mt-2 text-3xl font-semibold">Admin</h3>
              <p className="mt-3 text-sm leading-6 text-[#f4f0ea]/70">
                Workspace owner. Users, billing, settings, and who gets a
                Manager seat.
              </p>
              <Link
                href="/login/admin"
                className="mt-8 inline-flex text-sm font-medium text-[#c4a574]"
              >
                Admin login →
              </Link>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/5 p-7">
              <p className="text-xs tracking-[0.2em] text-[#9ec4d6] uppercase">
                Seat two
              </p>
              <h3 className="font-display mt-2 text-3xl font-semibold">Manager</h3>
              <p className="mt-3 text-sm leading-6 text-[#f4f0ea]/70">
                Operations lead. Assignments, activity, and handoffs — not
                system config.
              </p>
              <Link
                href="/login/manager"
                className="mt-8 inline-flex text-sm font-medium text-[#9ec4d6]"
              >
                Manager login →
              </Link>
            </article>
          </div>
        </section>

        <section id="pricing" className="scroll-mt-24 bg-[#152230] px-5 py-20 sm:px-10">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs tracking-[0.28em] text-[#c4a574] uppercase">
              Pricing
            </p>
            <h2 className="font-display mt-3 text-4xl font-semibold">
              Start small. Add seats when the floor grows.
            </h2>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {plans.map((plan) => (
                <article
                  key={plan.name}
                  className={`flex flex-col rounded-2xl border p-7 ${
                    plan.featured
                      ? "border-[#c4a574]/60 bg-[#c4a574]/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <h3 className="text-sm tracking-[0.16em] uppercase text-[#c4a574]">
                    {plan.name}
                  </h3>
                  <p className="font-display mt-3 text-4xl font-semibold">{plan.price}</p>
                  <p className="mt-1 text-sm text-[#f4f0ea]/50">{plan.note}</p>
                  <ul className="mt-6 flex-1 space-y-2 text-sm text-[#f4f0ea]/75">
                    {plan.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <Link
                    href="/get-started"
                    className={`mt-8 rounded-full px-5 py-2.5 text-center text-sm font-semibold ${
                      plan.featured
                        ? "bg-[#c4a574] text-[#1a2a3a] hover:bg-[#d4b98a]"
                        : "border border-white/15 hover:border-white/30"
                    }`}
                  >
                    Get started
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-3xl scroll-mt-24 px-5 py-20 sm:px-10">
          <p className="text-xs tracking-[0.28em] text-[#c4a574] uppercase">FAQ</p>
          <h2 className="font-display mt-3 text-4xl font-semibold">
            Straight answers before you start.
          </h2>
          <dl className="mt-10 space-y-8">
            {faqs.map((item) => (
              <div key={item.q}>
                <dt className="font-medium">{item.q}</dt>
                <dd className="mt-2 text-sm leading-6 text-[#f4f0ea]/65">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="px-5 pb-24 sm:px-10">
          <div className="mx-auto max-w-6xl rounded-3xl border border-[#c4a574]/30 bg-[#c4a574]/10 px-8 py-14 text-center">
            <h2 className="font-display text-4xl font-semibold sm:text-5xl">
              Open a Cloudust workspace today.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[#f4f0ea]/70">
              Get started as Admin, invite Managers, and keep Skydust Connection
              work in one SaaS — not in chat threads.
            </p>
            <Link
              href="/get-started"
              className="mt-8 inline-flex rounded-full bg-[#c4a574] px-8 py-3 text-sm font-semibold text-[#1a2a3a] hover:bg-[#d4b98a]"
            >
              Get started
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
