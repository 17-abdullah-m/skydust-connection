import Image from "next/image";
import Link from "next/link";
import { HeroSlideshow } from "./components/HeroSlideshow";
import { ProductGrid } from "./components/ProductGrid";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";
import { collections, products } from "@/lib/products";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-white text-neutral-900">
      <SiteHeader />
      <main>
        <HeroSlideshow />

        <section className="mx-auto max-w-[1400px] px-4 py-16 md:px-8">
          <h2 className="text-center text-2xl font-medium tracking-wide md:text-3xl">
            Shop By Collections
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-5">
            {collections.map((item) => (
              <Link key={item.slug} href={`/collections/${item.slug}`} className="group block">
                <div className="relative aspect-square overflow-hidden bg-neutral-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 768px) 20vw, 50vw"
                    className="object-cover transition duration-300 group-hover:scale-[1.04]"
                  />
                </div>
                <p className="mt-3 text-center text-sm tracking-wide">{item.title}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-4 pb-20 md:px-8">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="text-2xl font-medium tracking-wide">Best sellers</h2>
            <Link href="/shop" className="text-sm underline underline-offset-4">
              View all
            </Link>
          </div>
          <ProductGrid items={products.slice(0, 8)} />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
