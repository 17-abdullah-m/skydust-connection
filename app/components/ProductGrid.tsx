import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";
import { AddToCartButton } from "./AddToCartButton";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-[#f3f3f3]">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
          />
          {product.compareAt ? (
            <span className="absolute left-3 top-3 bg-white px-2 py-1 text-[11px] font-medium tracking-wide">
              Sale
            </span>
          ) : null}
        </div>
        <div className="mt-3 space-y-1">
          <p className="text-[11px] tracking-[0.18em] text-[#888] uppercase">SKYDUST</p>
          <h3 className="text-sm font-medium text-[#111]">{product.title}</h3>
          <p className="text-sm text-[#111]">
            {product.compareAt ? (
              <>
                <span className="mr-2 text-[#999] line-through">
                  {formatPrice(product.compareAt)}
                </span>
                {formatPrice(product.price)}
              </>
            ) : (
              formatPrice(product.price)
            )}
          </p>
        </div>
      </Link>
      <div className="mt-3">
        <AddToCartButton
          slug={product.slug}
          title={product.title}
          price={product.price}
          image={product.image}
        />
      </div>
    </article>
  );
}

export function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
      {items.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
