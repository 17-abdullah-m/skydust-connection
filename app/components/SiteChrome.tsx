"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartProvider";
import { countries, megaNav } from "@/lib/products";

function Logo() {
  return (
    <Image
      src="/skydust-wordmark.png"
      alt="SKYDUST"
      width={411}
      height={70}
      priority
      unoptimized
      className="h-8 w-auto object-contain md:h-10"
      style={{ width: "auto", height: 36 }}
    />
  );
}

function CountryTicker() {
  const row = [...countries, ...countries];
  return (
    <div className="overflow-hidden bg-black text-white">
      <div className="skydust-ticker py-2">
        {row.map((name, index) => (
          <span
            key={`${name}-${index}`}
            className="inline-flex items-center px-6 text-[11px] tracking-[0.28em] uppercase"
          >
            {name}
            <span className="ml-6 opacity-40">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function SiteHeader() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | null>(null);

  return (
    <div className="sticky top-0 z-30 bg-white">
      <CountryTicker />
      <header className="border-b border-neutral-200">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 md:px-8">
          <button
            type="button"
            className="text-sm md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            Menu
          </button>

          <Link href="/" className="md:hidden">
            <Logo />
          </Link>

          <nav className="hidden flex-1 items-center gap-5 text-[13px] tracking-wide text-neutral-800 lg:flex">
            {megaNav.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setHover(item.label)}
                onMouseLeave={() => setHover(null)}
              >
                <Link href={item.href} className="inline-flex items-center whitespace-nowrap py-2 hover:opacity-60">
                  {item.label}
                  {item.children ? <span className="ml-1 text-[10px]">▾</span> : null}
                </Link>
                {item.children && hover === item.label ? (
                  <div className="absolute left-0 top-full z-40 min-w-64 border border-neutral-200 bg-white py-2 shadow-sm">
                    {item.children.map((child) => (
                      <Link
                        key={child.href + child.label}
                        href={child.href}
                        className="block px-4 py-2 text-[13px] hover:bg-neutral-50"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-5 text-[13px]">
            <Link href="/search" className="hidden hover:opacity-60 sm:inline">
              Search
            </Link>
            <Link href="/login" className="hidden hover:opacity-60 sm:inline">
              Log in
            </Link>
            <Link href="/cart">Cart ({count})</Link>
          </div>
        </div>

        <div className="hidden justify-center border-t border-neutral-100 py-5 md:flex">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        {open ? (
          <nav className="grid gap-3 border-t border-neutral-200 px-4 py-4 text-sm md:hidden">
            {megaNav.map((item) => (
              <div key={item.label}>
                <Link href={item.href} onClick={() => setOpen(false)} className="font-medium">
                  {item.label}
                </Link>
                {item.children?.map((child) => (
                  <Link
                    key={child.href + child.label}
                    href={child.href}
                    onClick={() => setOpen(false)}
                    className="mt-1 block pl-3 text-neutral-600"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
            <Link href="/search" onClick={() => setOpen(false)}>
              Search
            </Link>
            <Link href="/login" onClick={() => setOpen(false)}>
              Log in
            </Link>
          </nav>
        ) : null}
      </header>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-neutral-200 bg-white">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 md:grid-cols-4 md:px-8">
        <div>
          <h3 className="text-sm font-medium">About Us</h3>
          <p className="mt-4 text-sm leading-6 text-neutral-600">
            SKYDUST builds scent for homes, hotels, and workplaces: intelligent
            diffusers, aroma oils, reeds, room sprays, and candles.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium">Connect Us</h3>
          <ul className="mt-4 space-y-2 text-sm text-neutral-600">
            <li>
              <Link href="/" className="hover:text-black">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-black">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-black">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/scent-profiles" className="hover:text-black">
                Scent Profiles
              </Link>
            </li>
            <li>
              <Link href="/faqs" className="hover:text-black">
                FAQ&apos;s
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-black">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-black">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/refund" className="hover:text-black">
                Return & Refund Policy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-medium">Quick links</h3>
          <ul className="mt-4 space-y-2 text-sm text-neutral-600">
            <li>
              <Link href="/collections/reeds" className="hover:text-black">
                Reeds
              </Link>
            </li>
            <li>
              <Link href="/collections/candles" className="hover:text-black">
                Candles
              </Link>
            </li>
            <li>
              <Link href="/collections/diffusers" className="hover:text-black">
                Diffusers
              </Link>
            </li>
            <li>
              <Link href="/collections/aroma-oils" className="hover:text-black">
                Aroma Oils
              </Link>
            </li>
            <li>
              <Link href="/collections/room-spray" className="hover:text-black">
                Room Spray
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-medium">Subscribe to our emails</h3>
          <p className="mt-4 text-sm text-neutral-600">
            Be the first to know about new collections and exclusive offers.
          </p>
          <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="Email"
              className="w-full border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-black"
            />
            <button type="submit" className="bg-black px-4 py-2 text-sm text-white">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <p className="border-t border-neutral-200 px-4 py-5 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} SKYDUST Pakistan.
      </p>
    </footer>
  );
}

export function PageShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-white text-neutral-900">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-14 md:px-8">
        <h1 className="text-center text-3xl font-medium">{title}</h1>
        <div className="mt-8 space-y-4 text-sm leading-7 text-neutral-600">{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}
