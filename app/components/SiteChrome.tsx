"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartProvider";
import { useLang } from "./LanguageProvider";
import { megaNav } from "@/lib/products";
import { INSTAGRAM_HREF, WHATSAPP_HREF } from "@/lib/scents";

type ChromeVariant = "default" | "luxury";

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

function CountryTicker({ luxury }: { luxury?: boolean }) {
  const { lang } = useLang();
  const pair = lang === "ar" ? ["عُمان", "باكستان"] : ["OMAN", "PAKISTAN"];
  const line = Array.from({ length: 16 }, () => pair).flat();

  return (
    <div className={`overflow-hidden py-2 ${luxury ? "bg-[#050505]" : "bg-black"}`}>
      <div className="skydust-ticker flex w-max gap-12 whitespace-nowrap">
        {line.map((country, index) => (
          <span
            key={`${country}-${index}`}
            className={`text-[11px] tracking-[0.28em] uppercase ${
              luxury ? "text-[#c9a96a]" : "text-white"
            }`}
          >
            {country}
          </span>
        ))}
      </div>
    </div>
  );
}

function LanguageSwitch() {
  const { lang, setLang, t } = useLang();
  return (
    <div className="flex items-center gap-1 text-[13px]">
      <button
        type="button"
        onClick={() => setLang("en")}
        className={lang === "en" ? "font-semibold" : "opacity-50 hover:opacity-80"}
      >
        {t.english}
      </button>
      <span className="opacity-30">/</span>
      <button
        type="button"
        onClick={() => setLang("ar")}
        className={lang === "ar" ? "font-semibold" : "opacity-50 hover:opacity-80"}
      >
        {t.arabic}
      </button>
    </div>
  );
}

export function SiteHeader({ variant = "default" }: { variant?: ChromeVariant }) {
  const { count } = useCart();
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const luxury = variant === "luxury";

  return (
    <div
      className={
        luxury
          ? "sticky top-0 z-40 bg-[#070707] text-[#f3e6c8]"
          : "sticky top-0 z-30 bg-white"
      }
    >
      <CountryTicker luxury={luxury} />
      <header className={luxury ? "border-b border-white/10" : "border-b border-neutral-200"}>
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 md:px-8">
          <button
            type="button"
            className="text-sm md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={t.menu}
          >
            {t.menu}
          </button>

          <Link href="/" className={`md:hidden ${luxury ? "bg-white px-2.5 py-1" : ""}`}>
            <Logo />
          </Link>

          <nav
            className={`hidden flex-1 items-center gap-5 text-[13px] tracking-wide lg:flex ${
              luxury ? "text-[#f3e6c8]/80" : "text-neutral-800"
            }`}
          >
            {megaNav.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setHover(item.label)}
                onMouseLeave={() => setHover(null)}
              >
                <Link href={item.href} className="whitespace-nowrap hover:opacity-60">
                  {t.nav[item.label as keyof typeof t.nav]}
                </Link>
                {item.children && hover === item.label ? (
                  <div
                    className={
                      luxury
                        ? "absolute start-0 top-full z-40 min-w-64 border border-white/10 bg-[#111] py-3"
                        : "absolute start-0 top-full z-40 min-w-64 border border-neutral-200 bg-white py-3 shadow-sm"
                    }
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href + child.label}
                        href={child.href}
                        className={
                          luxury
                            ? "block px-4 py-2 text-sm text-[#f3e6c8]/75 hover:bg-white/5"
                            : "block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                        }
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-4 text-[13px]">
            <LanguageSwitch />
            <Link href="/search" className="hidden hover:opacity-60 sm:inline">
              {t.search}
            </Link>
            <Link href="/login" className="hidden hover:opacity-60 sm:inline">
              {t.login}
            </Link>
            <Link href="/cart">
              {t.cart} ({count})
            </Link>
          </div>
        </div>

        <div
          className={`hidden justify-center py-5 md:flex ${
            luxury ? "border-t border-white/10" : "border-t border-neutral-100"
          }`}
        >
          <Link href="/" className={luxury ? "bg-white px-3 py-1.5" : ""}>
            <Logo />
          </Link>
        </div>

        {open ? (
          <nav
            className={`grid max-h-[70vh] gap-1 overflow-auto px-4 py-4 text-sm md:hidden ${
              luxury ? "border-t border-white/10" : "border-t border-neutral-200"
            }`}
          >
            {megaNav.map((item) => (
              <div
                key={item.label}
                className={`py-2 ${luxury ? "border-b border-white/10" : "border-b border-neutral-100"}`}
              >
                <Link href={item.href} onClick={() => setOpen(false)} className="font-medium">
                  {t.nav[item.label as keyof typeof t.nav]}
                </Link>
                {item.children?.map((child) => (
                  <Link
                    key={child.href + child.label}
                    href={child.href}
                    onClick={() => setOpen(false)}
                    className={`mt-2 block ps-3 ${luxury ? "text-white/55" : "text-neutral-600"}`}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
            <Link href="/shop" onClick={() => setOpen(false)} className="py-2">
              {t.allProducts}
            </Link>
          </nav>
        ) : null}
      </header>
    </div>
  );
}

function InstagramIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-5 3.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2zm0 2A1.8 1.8 0 1 0 13.8 12 1.8 1.8 0 0 0 12 10.2zM17.4 6.6a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"
      />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm4.52 12.95c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.15.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74 1.76.76 2.12.61 2.5.57.38-.04 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29z"
      />
    </svg>
  );
}

export function SiteFooter({ variant = "default" }: { variant?: ChromeVariant }) {
  const { t } = useLang();
  const luxury = variant === "luxury";
  const muted = luxury ? "text-white/55 hover:text-[#c9a96a]" : "text-neutral-600 hover:text-black";

  return (
    <footer
      className={
        luxury
          ? "mt-auto border-t border-white/10 bg-[#050505] text-[#f3e6c8]"
          : "mt-auto border-t border-neutral-200 bg-white"
      }
    >
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 md:grid-cols-4 md:px-8">
        <div>
          <h3 className="text-sm font-medium">{t.about}</h3>
          <p className={`mt-4 text-sm leading-6 ${luxury ? "text-white/55" : "text-neutral-600"}`}>
            {t.aboutBody}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium">{t.connect}</h3>
          <ul className={`mt-4 space-y-2 text-sm ${luxury ? "text-white/55" : "text-neutral-600"}`}>
            <li>
              <Link href="/" className={muted}>
                {t.home}
              </Link>
            </li>
            <li>
              <Link href="/about" className={muted}>
                {t.about}
              </Link>
            </li>
            <li>
              <Link href="/contact" className={muted}>
                {t.contact}
              </Link>
            </li>
            <li>
              <Link href="/scent-profiles" className={muted}>
                {t.scentProfiles}
              </Link>
            </li>
            <li>
              <Link href="/faqs" className={muted}>
                {t.faqs}
              </Link>
            </li>
            <li>
              <Link href="/terms" className={muted}>
                {t.terms}
              </Link>
            </li>
            <li>
              <Link href="/privacy" className={muted}>
                {t.privacy}
              </Link>
            </li>
            <li>
              <Link href="/refund" className={muted}>
                {t.refund}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-medium">{luxury ? t.luxury.fragranceCollection : t.quick}</h3>
          <ul className={`mt-4 space-y-2 text-sm ${luxury ? "text-white/55" : "text-neutral-600"}`}>
            {luxury ? (
              <>
                <li>
                  <Link href="/#scent-collection" className={muted}>
                    {t.luxury.scentCollectionTitle}
                  </Link>
                </li>
                <li>
                  <Link href="/collections/aroma-oils" className={muted}>
                    {t.nav["Aroma Oils"]}
                  </Link>
                </li>
                <li>
                  <Link href="/collections/diffusers" className={muted}>
                    {t.nav["Scent Diffusers"]}
                  </Link>
                </li>
                <li>
                  <Link href="/collections/reeds" className={muted}>
                    {t.nav["Reeds Diffusers"]}
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className={muted}>
                    {t.allProducts}
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/collections/reeds" className="hover:text-black">
                    {t.nav["Reeds Diffusers"]}
                  </Link>
                </li>
                <li>
                  <Link href="/collections/candles" className="hover:text-black">
                    {t.nav["Scented Candles"]}
                  </Link>
                </li>
                <li>
                  <Link href="/collections/diffusers" className="hover:text-black">
                    {t.nav["Scent Diffusers"]}
                  </Link>
                </li>
                <li>
                  <Link href="/collections/aroma-oils" className="hover:text-black">
                    {t.nav["Aroma Oils"]}
                  </Link>
                </li>
                <li>
                  <Link href="/collections/room-spray" className="hover:text-black">
                    {t.nav["Room Spray"]}
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div>
          {luxury ? (
            <>
              <h3 className="text-sm font-medium">{t.luxury.follow}</h3>
              <div className="mt-5 flex flex-col gap-3 text-sm">
                <a
                  href={INSTAGRAM_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-white/70 hover:text-[#c9a96a]"
                >
                  <InstagramIcon className="h-5 w-5" />
                  {t.luxury.instagram}
                </a>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-white/70 hover:text-[#c9a96a]"
                  aria-label={t.luxury.whatsapp}
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  {t.luxury.whatsapp}
                </a>
                <Link href="/contact" className="text-white/70 hover:text-[#c9a96a]">
                  {t.contact}
                </Link>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-sm font-medium">{t.subscribe}</h3>
              <p className="mt-4 text-sm text-neutral-600">{t.subscribeHint}</p>
              <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  required
                  placeholder={t.email}
                  className="w-full border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-black"
                />
                <button type="submit" className="bg-black px-4 py-2 text-sm text-white">
                  {t.subscribeBtn}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
      <p
        className={`border-t px-4 py-5 text-center text-xs ${
          luxury ? "border-white/10 text-white/35" : "border-neutral-200 text-neutral-500"
        }`}
      >
        © {new Date().getFullYear()} {t.footerNote}
      </p>
    </footer>
  );
}
