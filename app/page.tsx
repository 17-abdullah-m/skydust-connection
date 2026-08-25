import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";
import { ProductGrid } from "./components/ProductGrid";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-white text-[#111]">
      <SiteHeader />

      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-8 sm:px-8 lg:grid-cols-2 lg:py-12">
          <div>
            <p className="text-xs tracking-[0.28em] text-[#888] uppercase">
              Automatic air freshener
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Fresh rooms. Refills on a schedule.
            </h1>
            <p className="mt-4 max-w-md text-base leading-7 text-[#555]">
              SKYDUST ships the diffuser, then keeps cartridges coming. Shop
              scents below or start a company subscription.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="rounded-full bg-[#111] px-6 py-3 text-sm font-medium text-white hover:bg-[#333]"
              >
                Shop all
              </Link>
              <Link
                href="/get-started"
                className="rounded-full border border-[#ddd] px-6 py-3 text-sm font-medium hover:border-[#111]"
              >
                Subscribe
              </Link>
            </div>
          </div>
          <div className="overflow-hidden bg-[#f6f6f6]">
            <Image
              src="/air-freshener-saas-hero.png"
              alt="SKYDUST automatic diffuser with Pay confirmation"
              width={1920}
              height={1080}
              priority
              className="h-auto w-full"
            />
          </div>
        </section>

        <section id="featured" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-10 sm:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs tracking-[0.2em] text-[#888] uppercase">Featured</p>
              <h2 className="mt-1 text-2xl font-semibold">Air fresheners</h2>
            </div>
            <Link href="/shop" className="text-sm underline underline-offset-4">
              View all
            </Link>
          </div>
          <ProductGrid items={products} />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
