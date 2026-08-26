import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { collections } from "@/lib/products";

export default function CollectionsIndexPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-white text-neutral-900">
      <SiteHeader />
      <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-12 md:px-8">
        <h1 className="text-center text-3xl font-medium">Collections</h1>
        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
          {collections.map((item) => (
            <Link key={item.slug} href={`/collections/${item.slug}`} className="group">
              <div className="relative aspect-square overflow-hidden bg-neutral-100">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <p className="mt-3 text-center text-sm">{item.title}</p>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
