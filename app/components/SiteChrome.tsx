"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartProvider";

export function SiteHeader() {
  const { count } = useCart();

  return (
    <div className="sticky top-0 z-30 bg-white">
      <p className="bg-[#111] px-4 py-2 text-center text-[11px] tracking-[0.16em] text-white uppercase">
        Free shipping on auto-refill · SKYDUST
      </p>
      <header className="flex items-center justify-between gap-4 border-b border-[#eee] px-4 py-3 sm:px-8">
        <nav className="hidden items-center gap-6 text-sm text-[#444] md:flex">
          <Link href="/shop" className="hover:text-[#111]">
            Shop
          </Link>
          <Link href="/#featured" className="hover:text-[#111]">
            Collection
          </Link>
          <Link href="/get-started" className="hover:text-[#111]">
            Subscribe
          </Link>
        </nav>

        <Link href="/" className="flex items-center justify-center">
          <Image
            src="/skydust-logo.png"
            alt="SKYDUST"
            width={464}
            height={295}
            priority
            className="h-8 w-auto sm:h-10"
          />
        </Link>

        <div className="flex items-center gap-4 text-sm">
          <Link href="/login" className="hidden text-[#444] hover:text-[#111] sm:inline">
            Log in
          </Link>
          <Link href="/cart" className="text-[#111]">
            Cart ({count})
          </Link>
        </div>
      </header>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[#eee] bg-white px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        <Link href="/">
          <Image
            src="/skydust-logo.png"
            alt="SKYDUST"
            width={464}
            height={295}
            className="h-8 w-auto"
          />
        </Link>
        <div className="grid grid-cols-2 gap-10 text-sm">
          <div className="space-y-2">
            <p className="text-xs tracking-[0.16em] text-[#888] uppercase">Shop</p>
            <Link href="/shop" className="block text-[#444] hover:text-[#111]">
              All products
            </Link>
            <Link href="/#featured" className="block text-[#444] hover:text-[#111]">
              Air fresheners
            </Link>
            <Link href="/get-started" className="block text-[#444] hover:text-[#111]">
              Subscribe
            </Link>
          </div>
          <div className="space-y-2">
            <p className="text-xs tracking-[0.16em] text-[#888] uppercase">Account</p>
            <Link href="/login/admin" className="block text-[#444] hover:text-[#111]">
              Admin login
            </Link>
            <Link href="/login/manager" className="block text-[#444] hover:text-[#111]">
              Manager login
            </Link>
            <Link href="/cart" className="block text-[#444] hover:text-[#111]">
              Cart
            </Link>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-xs text-[#999]">
        © {new Date().getFullYear()} SKYDUST. Automatic air freshener subscription.
      </p>
    </footer>
  );
}
