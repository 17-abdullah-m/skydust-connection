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
      className={`relative overflow-hidden bg-[#f4f2ee] ${
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
          className="object-contain p-2 sm:p-3"
        />
        {size !== "thumb" ? <BottleLabel product={product} size={size} /> : null}
      </div>
      {size !== "thumb" ? <StockBadge stock={product.stock} /> : null}
    </div>
  );
}

function BottleLabel({ product, size }: { product: Product; size: PhotoSize }) {
  const hero = size === "hero";
  const onBottle = product.kind === "bottle";

  return (
    <div
      className={`bottle-label pointer-events-none absolute left-1/2 z-10 -translate-x-1/2 text-center text-[#1a1a1a] ${
        onBottle
          ? hero
            ? "top-[29%] w-[23%] px-2.5 py-3"
            : "top-[29%] w-[24%] px-1 py-1.5 sm:px-1.5 sm:py-2"
          : hero
            ? "top-[48%] w-[20%] px-2 py-2"
            : "top-[48%] w-[22%] px-1 py-1 sm:px-1.5 sm:py-1.5"
      }`}
    >
      <Image
        src="/skydust-logo.png"
        alt="SKYDUST"
        width={240}
        height={48}
        className={`mx-auto w-[88%] object-contain object-center ${hero ? "h-7" : "h-2.5 sm:h-3.5"}`}
      />
      {onBottle ? (
        <>
          <span className={`mt-1 block h-px w-full bg-neutral-300 ${hero ? "mt-2" : "mt-1"}`} />
          <p
            className={`mt-1 font-medium tracking-[0.18em] text-neutral-500 uppercase ${
              hero ? "text-[9px]" : "text-[4px] sm:text-[5.5px]"
            }`}
          >
            {product.labelKind}
          </p>
          <p
            className={`font-display leading-tight font-semibold ${
              hero ? "mt-1 text-[15px]" : "mt-0.5 text-[6px] sm:text-[8px]"
            }`}
          >
            {product.scent}
          </p>
          <p
            className={`font-semibold tracking-wide ${
              hero ? "mt-1 text-[13px]" : "mt-0.5 text-[6.5px] sm:text-[8px]"
            }`}
          >
            {product.volume}
          </p>
          <span className={`block h-px w-full bg-neutral-300 ${hero ? "mt-2 mb-1.5" : "mt-1 mb-0.5"}`} />
          <p
            className={`leading-tight text-neutral-500 ${
              hero ? "text-[8px]" : "hidden text-[4.5px] sm:block sm:text-[5px]"
            }`}
          >
            {product.labelUse}
          </p>
          {hero ? (
            <p className="mt-1 text-[7.5px] leading-tight text-neutral-400">
              Keep away from heat · External scenting only · Oman & Pakistan
            </p>
          ) : null}
        </>
      ) : (
        <p
          className={`mt-0.5 font-semibold tracking-wide ${
            hero ? "text-[11px]" : "text-[5.5px] sm:text-[7px]"
          }`}
        >
          {product.volume}
        </p>
      )}
    </div>
  );
}
