"use client";



import Image from "next/image";

import Link from "next/link";

import { useState } from "react";

import { useCart } from "./CartProvider";

import { useLang } from "./LanguageProvider";

import { megaNav } from "@/lib/products";



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

  const { lang } = useLang();

  const pair = lang === "ar" ? ["عُمان", "باكستان"] : ["OMAN", "PAKISTAN"];

  const line = Array.from({ length: 16 }, () => pair).flat();



  return (

    <div className="overflow-hidden bg-black py-2">

      <div className="skydust-ticker flex w-max gap-12 whitespace-nowrap">

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



export function SiteHeader() {

  const { count } = useCart();

  const { t } = useLang();

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

            aria-label={t.menu}

          >

            {t.menu}

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

                  {t.nav[item.label as keyof typeof t.nav]}

                </Link>

                {item.children && hover === item.label ? (

                  <div className="absolute start-0 top-full z-40 min-w-64 border border-neutral-200 bg-white py-3 shadow-sm">

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

                  {t.nav[item.label as keyof typeof t.nav]}

                </Link>

                {item.children?.map((child) => (

                  <Link

                    key={child.href + child.label}

                    href={child.href}

                    onClick={() => setOpen(false)}

                    className="mt-2 block ps-3 text-neutral-600"

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



export function SiteFooter() {

  const { t } = useLang();



  return (

    <footer className="mt-auto border-t border-neutral-200 bg-white">

      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 md:grid-cols-4 md:px-8">

        <div>

          <h3 className="text-sm font-medium">{t.about}</h3>

          <p className="mt-4 text-sm leading-6 text-neutral-600">{t.aboutBody}</p>

        </div>

        <div>

          <h3 className="text-sm font-medium">{t.connect}</h3>

          <ul className="mt-4 space-y-2 text-sm text-neutral-600">

            <li>

              <Link href="/" className="hover:text-black">

                {t.home}

              </Link>

            </li>

            <li>

              <Link href="/about" className="hover:text-black">

                {t.about}

              </Link>

            </li>

            <li>

              <Link href="/contact" className="hover:text-black">

                {t.contact}

              </Link>

            </li>

            <li>

              <Link href="/scent-profiles" className="hover:text-black">

                {t.scentProfiles}

              </Link>

            </li>

            <li>

              <Link href="/faqs" className="hover:text-black">

                {t.faqs}

              </Link>

            </li>

            <li>

              <Link href="/terms" className="hover:text-black">

                {t.terms}

              </Link>

            </li>

            <li>

              <Link href="/privacy" className="hover:text-black">

                {t.privacy}

              </Link>

            </li>

            <li>

              <Link href="/refund" className="hover:text-black">

                {t.refund}

              </Link>

            </li>

          </ul>

        </div>

        <div>

          <h3 className="text-sm font-medium">{t.quick}</h3>

          <ul className="mt-4 space-y-2 text-sm text-neutral-600">

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

          </ul>

        </div>

        <div>

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

        </div>

      </div>

      <p className="border-t border-neutral-200 px-4 py-5 text-center text-xs text-neutral-500">

        © {new Date().getFullYear()} {t.footerNote}

      </p>

    </footer>

  );

}


