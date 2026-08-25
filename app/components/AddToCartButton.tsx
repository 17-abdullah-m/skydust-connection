"use client";

import { useCart } from "./CartProvider";

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
  const { add } = useCart();

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        add({ slug, title, price, image });
      }}
      className="w-full rounded-full bg-[#111] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#333]"
    >
      Add to cart
    </button>
  );
}
