import { notFound } from "next/navigation";
import { ProductGrid } from "../../components/ProductGrid";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";
import { collections, getCollection, productsIn } from "@/lib/products";

export function generateStaticParams() {
  return [
    ...collections.map((item) => ({ slug: item.slug })),
    { slug: "bundles" },
  ];
}

const extra = {
  bundles: { title: "Bundle Offers" },
};

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollection(slug);
  const title = collection?.title ?? extra[slug as keyof typeof extra]?.title;
  const items = productsIn(slug);
  if (!title || items.length === 0) notFound();

  return (
    <div className="flex min-h-full flex-1 flex-col bg-white text-neutral-900">
      <SiteHeader />
      <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-12 md:px-8">
        <h1 className="text-center text-3xl font-medium">{title}</h1>
        <p className="mt-2 text-center text-sm text-neutral-500">{items.length} products</p>
        <div className="mt-12">
          <ProductGrid items={items} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
