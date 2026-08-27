"use client";

import Image from "next/image";
import Link from "next/link";
import { HeroSlideshow } from "./HeroSlideshow";
import { ProductGrid } from "./ProductGrid";
import { SiteFooter, SiteHeader } from "./SiteChrome";
import { useLang } from "./LanguageProvider";
import { featuredCollections, products } from "@/lib/products";

const collectionAr: Record<string, string> = {
  diffusers: "أجهزة العطر",
  "aroma-oils": "الزيوت العطرية",
  reeds: "أعواد العطر",
  candles: "الشموع المعطرة",
  "room-spray": "بخاخ الغرف",
};

export function HomePage() {
  const { t, lang } = useLang();

  return (
    <div className="flex min-h-full flex-1 flex-col bg-white text-neutral-900">
      <SiteHeader />
      <main>
        <HeroSlideshow />

        <section className="mx-auto w-full max-w-[1720px] px-3 py-16 md:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-medium tracking-wide md:text-3xl">
            {t.shopCollections}
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-5 md:gap-7">
            {featuredCollections.map((item) => (
              <Link key={item.slug} href={`/collections/${item.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
                  <div className="absolute inset-0 transition-transform duration-[850ms] ease-out group-hover:scale-110">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 768px) 20vw, 50vw"
                      className="collection-kenburns object-cover"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-black/0 transition duration-700 group-hover:bg-black/20" />
                </div>
                <p className="mt-4 text-center text-sm tracking-[0.14em] uppercase transition duration-500 group-hover:tracking-[0.22em]">
                  {lang === "ar" ? collectionAr[item.slug] ?? item.title : item.title}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-4 pb-20 md:px-8">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="text-2xl font-medium tracking-wide">{t.bestSellers}</h2>
            <Link href="/shop" className="text-sm underline underline-offset-4">
              {t.viewAll}
            </Link>
          </div>
          <ProductGrid items={products.slice(0, 8)} />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
