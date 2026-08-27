import { notFound } from "next/navigation";
import { CollectionHub } from "../../components/CollectionHub";
import { ProductGrid } from "../../components/ProductGrid";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";
import {
  collectionSlugFromHref,
  collections,
  getCollection,
  navChildrenFor,
  productsIn,
} from "@/lib/products";

export function generateStaticParams() {
  return collections.map((item) => ({ slug: item.slug }));
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollection(slug);
  const items = productsIn(slug);
  const children = navChildrenFor(`/collections/${slug}`).map((child) => {
    const childSlug = collectionSlugFromHref(child.href);
    const childCollection = childSlug ? getCollection(childSlug) : null;
    return {
      href: child.href,
      label: child.label,
      image: childCollection?.image ?? collection?.image ?? "/collections/diffusers.png",
    };
  });

  if (!collection || (items.length === 0 && children.length === 0)) notFound();

  return (
    <div className="flex min-h-full flex-1 flex-col bg-white text-neutral-900">
      <SiteHeader />
      <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-12 md:px-8">
        <h1 className="text-center text-3xl font-medium">{collection.title}</h1>
        <p className="mt-2 text-center text-sm text-neutral-500">
          {children.length > 0
            ? `${children.length} collections`
            : `${items.length} products`}
        </p>
        {children.length > 0 ? (
          <div className="mt-12">
            <CollectionHub items={children} />
          </div>
        ) : null}
        {items.length > 0 ? (
          <div className={children.length > 0 ? "mt-16" : "mt-12"}>
            {children.length > 0 ? (
              <h2 className="mb-8 text-center text-xl font-medium">All products</h2>
            ) : null}
            <ProductGrid items={items} />
          </div>
        ) : null}
      </main>
      <SiteFooter />
    </div>
  );
}
