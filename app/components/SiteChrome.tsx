import Link from "next/link";

export function SiteHeader({ variant = "dark" }: { variant?: "dark" | "solid" }) {
  const onDark = variant === "dark";

  return (
    <header
      className={`relative z-20 flex items-center justify-between gap-4 px-5 py-5 sm:px-10 ${
        onDark ? "text-[#f4f0ea]" : "border-b border-[#1a2a3a]/10 bg-[#f4f0ea] text-[#1a2a3a]"
      }`}
    >
      <Link href="/" className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c4a574]/50 bg-[#c4a574]/15 text-sm font-semibold text-[#c4a574]">
          C
        </span>
        <span className="leading-tight">
          <span className="block text-[10px] font-medium tracking-[0.22em] text-[#c4a574] uppercase">
            Skydust Connection
          </span>
          <span className="font-display text-lg font-semibold">Cloudust</span>
        </span>
      </Link>

      <nav className="hidden items-center gap-7 text-sm text-current/70 md:flex">
        <a href="/#product" className="hover:text-current">
          Product
        </a>
        <a href="/#roles" className="hover:text-current">
          Roles
        </a>
        <a href="/#pricing" className="hover:text-current">
          Pricing
        </a>
        <a href="/#faq" className="hover:text-current">
          FAQ
        </a>
      </nav>

      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          href="/login"
          className={`hidden rounded-full px-4 py-2 text-sm sm:inline-flex ${
            onDark ? "text-[#f4f0ea]/80 hover:text-[#f4f0ea]" : "text-[#1a2a3a]/70 hover:text-[#1a2a3a]"
          }`}
        >
          Log in
        </Link>
        <Link
          href="/get-started"
          className="rounded-full bg-[#c4a574] px-4 py-2 text-sm font-semibold text-[#1a2a3a] transition hover:bg-[#d4b98a]"
        >
          Get started
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#152230] px-5 py-12 text-[#f4f0ea] sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:flex-row sm:justify-between">
        <div>
          <p className="text-[10px] tracking-[0.22em] text-[#c4a574] uppercase">
            Skydust Connection
          </p>
          <p className="font-display mt-1 text-2xl font-semibold">Cloudust</p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-[#f4f0ea]/55">
            The operations SaaS for teams that run on two seats: Admin and
            Manager.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
          <div className="space-y-2">
            <p className="text-xs tracking-[0.18em] text-[#c4a574] uppercase">
              Product
            </p>
            <a href="/#product" className="block text-[#f4f0ea]/65 hover:text-[#f4f0ea]">
              Features
            </a>
            <a href="/#pricing" className="block text-[#f4f0ea]/65 hover:text-[#f4f0ea]">
              Pricing
            </a>
            <Link href="/get-started" className="block text-[#f4f0ea]/65 hover:text-[#f4f0ea]">
              Get started
            </Link>
          </div>
          <div className="space-y-2">
            <p className="text-xs tracking-[0.18em] text-[#c4a574] uppercase">
              Access
            </p>
            <Link href="/login/admin" className="block text-[#f4f0ea]/65 hover:text-[#f4f0ea]">
              Admin login
            </Link>
            <Link href="/login/manager" className="block text-[#f4f0ea]/65 hover:text-[#f4f0ea]">
              Manager login
            </Link>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-6xl text-xs text-[#f4f0ea]/35">
        © {new Date().getFullYear()} Skydust Connection. Cloudust is a SaaS
        product of Skydust Connection.
      </p>
    </footer>
  );
}
