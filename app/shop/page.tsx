import { ProductGrid } from "../components/ProductGrid";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { products } from "@/lib/products";

export default function ShopPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-white text-neutral-900">
      <SiteHeader />
      <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-12 md:px-8">
        <h1 className="text-center text-3xl font-medium">All</h1>
        <p className="mt-2 text-center text-sm text-neutral-500">{products.length} products</p>
        <div className="mt-12">
          <ProductGrid items={products} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
