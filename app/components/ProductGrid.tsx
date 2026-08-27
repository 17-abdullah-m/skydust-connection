import Link from "next/link";
import { PriceDisplay } from "./PriceDisplay";
import { ProductPhoto } from "./ProductPhoto";
import { StockStatus } from "./StockBadge";
import { type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group">
      <Link href={`/products/${product.slug}`} className="block">
        <ProductPhoto product={product} size="card" />
        <h3 className="mt-3 text-center text-sm font-medium">{product.title}</h3>
        <p className="mt-0.5 text-center text-[11px] tracking-wide text-neutral-500">
          {product.volume}
        </p>
        <div className="mt-1">
          <PriceDisplay amount={product.price} compareAt={product.compareAt} />
        </div>
        <div className="mt-1.5">
          <StockStatus stock={product.stock} />
        </div>
      </Link>
    </article>
  );
}

export function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
      {items.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
