"use client";

import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { useCart } from "../components/CartProvider";
import { PriceDisplay } from "../components/PriceDisplay";

export default function CartPage() {
  const { lines, total, remove } = useCart();

  return (
    <div className="flex min-h-full flex-1 flex-col bg-white text-[#111]">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-8">
        <h1 className="text-3xl font-semibold">Your cart</h1>
        {lines.length === 0 ? (
          <p className="mt-6 text-sm text-[#666]">
            Your cart is empty.{" "}
            <Link href="/shop" className="underline underline-offset-4">
              Continue shopping
            </Link>
          </p>
        ) : (
          <ul className="mt-8 divide-y divide-[#eee]">
            {lines.map((line) => (
              <li key={line.slug} className="flex gap-4 py-5">
                <div className="relative h-24 w-24 shrink-0 bg-[#f3f3f3]">
                  <Image src={line.image} alt={line.title} fill className="object-cover" />
                </div>
                <div className="flex flex-1 items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">{line.title}</p>
                    <p className="mt-1 text-sm text-[#666]">Qty {line.qty}</p>
                    <div className="mt-1">
                      <PriceDisplay amount={line.price} align="start" />
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(line.slug)}
                      className="mt-2 text-xs underline underline-offset-4"
                    >
                      Remove
                    </button>
                  </div>
                  <PriceDisplay amount={line.price * line.qty} align="start" />
                </div>
              </li>
            ))}
          </ul>
        )}
        {lines.length > 0 ? (
          <div className="mt-8 border-t border-[#eee] pt-6">
            <div className="flex items-start justify-between gap-4 text-sm">
              <span>Subtotal</span>
              <PriceDisplay amount={total} align="start" />
            </div>
            <Link
              href="/get-started"
              className="mt-6 flex w-full items-center justify-center rounded-full bg-[#111] px-4 py-3 text-sm font-medium text-white hover:bg-[#333]"
            >
              Checkout
            </Link>
          </div>
        ) : null}
      </main>
      <SiteFooter />
    </div>
  );
}
