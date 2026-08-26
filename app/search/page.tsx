"use client";

import { useMemo, useState } from "react";
import { ProductGrid } from "../components/ProductGrid";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { products } from "@/lib/products";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return products;
    return products.filter(
      (item) =>
        item.title.toLowerCase().includes(needle) ||
        item.blurb.toLowerCase().includes(needle) ||
        item.collection.includes(needle),
    );
  }, [query]);

  return (
    <div className="flex min-h-full flex-1 flex-col bg-white text-neutral-900">
      <SiteHeader />
      <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-12 md:px-8">
        <h1 className="text-center text-3xl font-medium">Search</h1>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search"
          className="mx-auto mt-8 block w-full max-w-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-black"
        />
        <p className="mt-4 text-center text-sm text-neutral-500">
          {results.length} products
        </p>
        <div className="mt-12">
          <ProductGrid items={results} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
