import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "../../components/AddToCartButton";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";
import { PriceDisplay } from "../../components/PriceDisplay";
import { getProduct, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <div className="flex min-h-full flex-1 flex-col bg-white text-[#111]">
      <SiteHeader />
      <main className="mx-auto grid w-full max-w-6xl flex-1 gap-10 px-4 py-10 sm:px-8 lg:grid-cols-2">
        <div className="relative aspect-square bg-[#f3f3f3]">
          <Image
            src={product.image}
            alt={product.title}
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-xs tracking-[0.2em] text-neutral-500 uppercase">
            SKYDUST · {product.collection.replace("-", " ")}
          </p>
          <h1 className="mt-3 text-4xl font-semibold">{product.title}</h1>
          <div className="mt-4">
            <PriceDisplay
              amount={product.price}
              compareAt={product.compareAt}
              align="start"
              size="lg"
            />
          </div>
          <p className="mt-5 max-w-md text-sm leading-6 text-[#555]">{product.blurb}</p>
          <div className="mt-8 max-w-sm">
            <AddToCartButton
              slug={product.slug}
              title={product.title}
              price={product.price}
              image={product.image}
            />
          </div>
          <Link href="/shop" className="mt-6 text-sm underline underline-offset-4">
            Back to shop
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
