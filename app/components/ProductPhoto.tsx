import Image from "next/image";
import { type Product } from "@/lib/products";
import { StockBadge } from "./StockBadge";

type PhotoSize = "card" | "hero" | "thumb";

export function ProductPhoto({
  product,
  size = "card",
  priority = false,
}: {
  product: Product;
  size?: PhotoSize;
  priority?: boolean;
}) {
  const sizes =
    size === "hero"
      ? "(min-width: 1024px) 50vw, 100vw"
      : size === "thumb"
        ? "96px"
        : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw";

  return (
    <div
      className={`relative overflow-hidden bg-[#f6f4f0] ${
        size === "thumb" ? "h-24 w-24" : "aspect-square"
      } ${product.stock <= 0 ? "grayscale-[0.35]" : ""}`}
    >
      <div className="absolute inset-0 origin-center transition duration-700 ease-out group-hover:scale-110">
        <Image
          src={product.image}
          alt={product.title}
          fill
          priority={priority}
          sizes={sizes}
          className="object-contain p-1 sm:p-2"
        />
      </div>
      {size !== "thumb" ? <StockBadge stock={product.stock} /> : null}
    </div>
  );
}
