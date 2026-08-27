"use client";

import { useLang } from "./LanguageProvider";

export function StockBadge({ stock }: { stock: number }) {
  const { t } = useLang();

  if (stock <= 0) {
    return (
      <span className="absolute top-2 left-2 z-20 bg-[#111] px-2 py-1 text-[10px] font-medium tracking-wide text-white uppercase">
        {t.soldOut}
      </span>
    );
  }

  return (
    <span className="absolute top-2 left-2 z-20 bg-white/90 px-2 py-1 text-[10px] font-medium text-emerald-800 shadow-sm">
      {t.inStockUnits.replace("{n}", String(stock))}
    </span>
  );
}

export function StockStatus({
  stock,
  align = "center",
}: {
  stock: number;
  align?: "center" | "start";
}) {
  const { t } = useLang();
  const alignClass = align === "start" ? "text-start" : "text-center";

  if (stock <= 0) {
    return <p className={`${alignClass} text-xs font-medium text-red-600`}>{t.outOfStock}</p>;
  }

  if (stock <= 8) {
    return (
      <p className={`${alignClass} text-xs font-medium text-amber-700`}>
        {t.onlyLeft.replace("{n}", String(stock))}
      </p>
    );
  }

  return (
    <p className={`${alignClass} text-xs text-emerald-700`}>
      {t.inStockUnits.replace("{n}", String(stock))}
    </p>
  );
}
