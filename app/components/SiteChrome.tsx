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
  const line = [...countries, ...countries];
  return (
    <div className="overflow-hidden bg-black py-2">
      <div className="skydust-ticker flex w-max gap-10 whitespace-nowrap">
        {line.map((country, index) => (
          <span
            key={`${country}-${index}`}
            className="text-[11px] tracking-[0.28em] text-white uppercase"
          >
            {country}
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
                <Link href={item.href} className="whitespace-nowrap hover:opacity-60">
                  {item.label}
                </Link>
                {item.children && hover === item.label ? (
                  <div className="absolute left-0 top-full z-40 min-w-64 border border-neutral-200 bg-white py-3 shadow-sm">
                    {item.children.map((child) => (
                      <Link
                        key={child.href + child.label}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
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
          <nav className="grid max-h-[70vh] gap-1 overflow-auto border-t border-neutral-200 px-4 py-4 text-sm md:hidden">
            {megaNav.map((item) => (
              <div key={item.label} className="border-b border-neutral-100 py-2">
                <Link href={item.href} onClick={() => setOpen(false)} className="font-medium">
                  {item.label}
                </Link>
                {item.children?.map((child) => (
                  <Link
                    key={child.href + child.label}
                    href={child.href}
                    onClick={() => setOpen(false)}
                    className="mt-2 block pl-3 text-neutral-600"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
            <Link href="/shop" onClick={() => setOpen(false)} className="py-2">
              All products
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
            SKYDUST is a scenting house for homes, hotels, and workplaces.
            Diffusers, aroma oils, reeds, sprays, and candles — one clean
            catalog.
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
