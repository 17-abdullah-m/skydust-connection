"use client";

import { useLang } from "./LanguageProvider";
import { formatOmr, formatPrice } from "@/lib/products";

export function PriceDisplay({
  amount,
  compareAt,
  align = "center",
  size = "sm",
}: {
  amount: number;
  compareAt?: number;
  align?: "center" | "start";
  size?: "sm" | "lg";
}) {
  const { lang } = useLang();
  const format = lang === "ar" ? formatOmr : formatPrice;
  const textClass = size === "lg" ? "text-xl" : "text-sm";

  return (
    <span className={`block ${textClass} text-neutral-800 ${align === "center" ? "text-center" : "text-start"}`}>
      {compareAt ? (
        <>
          <span className="me-2 text-neutral-400 line-through">{format(compareAt)}</span>
          {format(amount)}
        </>
      ) : (
        format(amount)
      )}
    </span>
  );
}
