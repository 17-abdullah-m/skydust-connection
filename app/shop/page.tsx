import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { ProductGrid } from "../components/ProductGrid";
import { products } from "@/lib/products";

export default function ShopPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-white text-[#111]">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-8">
        <p className="text-xs tracking-[0.2em] text-[#888] uppercase">Catalog</p>
        <h1 className="mt-2 text-3xl font-semibold">All products</h1>
        <p className="mt-2 text-sm text-[#666]">{products.length} products</p>
        <div className="mt-10">
          <ProductGrid items={products} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
