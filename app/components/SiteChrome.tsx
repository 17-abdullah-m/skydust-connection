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
      <header className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-[#eee] px-4 py-4 sm:px-8">
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
        <div className="md:hidden" />

        <Link href="/" className="flex items-center justify-center">
          <Image
            src="/skydust-wordmark.png"
            alt="SKYDUST"
            width={411}
            height={70}
            priority
            unoptimized
            className="h-9 w-auto max-w-[200px] object-contain sm:h-11 sm:max-w-[240px]"
            style={{ width: "auto", height: 44 }}
          />
        </Link>

        <div className="flex items-center justify-end gap-4 text-sm">
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
            src="/skydust-wordmark.png"
            alt="SKYDUST"
            width={411}
            height={70}
            unoptimized
            className="h-9 w-auto object-contain"
            style={{ width: "auto", height: 36 }}
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
