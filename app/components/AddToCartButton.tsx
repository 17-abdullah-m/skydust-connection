"use client";

import { getProduct } from "@/lib/products";
import { useCart } from "./CartProvider";
import { useLang } from "./LanguageProvider";

export function AddToCartButton({
  slug,
  title,
  price,
  image,
}: {
  slug: string;
  title: string;
  price: number;
  image: string;
}) {
  const { add, lines } = useCart();
  const { t } = useLang();
  const product = getProduct(slug);
  const stock = product?.stock ?? 0;
  const inCart = lines.find((line) => line.slug === slug)?.qty ?? 0;
  const soldOut = stock <= 0;
  const atMax = inCart >= stock;

  return (
    <button
      type="button"
      disabled={soldOut || atMax}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        add({ slug, title, price, image });
      }}
      className="w-full rounded-full bg-[#111] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#333] disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-600"
    >
      {soldOut ? t.outOfStock : t.addToCart}
    </button>
  );
}
