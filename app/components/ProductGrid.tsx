import Image from "next/image";
import Link from "next/link";
import { PriceDisplay } from "./PriceDisplay";
import { type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-neutral-100">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-700 ease-out group-hover:scale-110"
          />
        </div>
        <h3 className="mt-3 text-center text-sm font-medium">{product.title}</h3>
        <div className="mt-1">
          <PriceDisplay amount={product.price} compareAt={product.compareAt} />
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
