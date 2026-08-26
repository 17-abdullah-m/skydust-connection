"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { useLang } from "../LanguageProvider";

export function BeforeAfter() {
  const { t, dir } = useLang();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(52);

  const setFromClientX = useCallback(
    (clientX: number) => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      let pct = ((clientX - rect.left) / rect.width) * 100;
      if (dir === "rtl") pct = 100 - pct;
      setValue(Math.min(94, Math.max(6, pct)));
    },
    [dir],
  );

  return (
    <section className="mx-auto max-w-5xl px-4 py-24 md:px-8">
      <p className="text-center text-[11px] tracking-[0.38em] text-[#c9a96a] uppercase">
        {t.luxury.beforeAfterKicker}
      </p>
      <h2 className="font-display mt-4 text-center text-4xl text-[#f3e6c8] md:text-5xl">
        {t.luxury.beforeAfterTitle}
      </h2>

      <div
        ref={wrapRef}
        className="relative mt-12 aspect-[16/10] cursor-ew-resize overflow-hidden rounded-sm border border-white/10 bg-black select-none"
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          setFromClientX(event.clientX);
        }}
        onPointerMove={(event) => {
          if (event.buttons) setFromClientX(event.clientX);
        }}
      >
        <Image
          src="/luxury/room-after.png"
          alt={t.luxury.afterLabel}
          fill
          sizes="(min-width: 1024px) 64rem, 100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            clipPath:
              dir === "rtl"
                ? `inset(0 0 0 ${value}%)`
                : `inset(0 ${100 - value}% 0 0)`,
          }}
        >
          <Image
            src="/luxury/room-before.png"
            alt={t.luxury.beforeLabel}
            fill
            sizes="(min-width: 1024px) 64rem, 100vw"
            className="object-cover"
          />
        </div>

        <div
          className="absolute top-0 bottom-0 z-10 w-px bg-[#d4af77]"
          style={dir === "rtl" ? { right: `${value}%` } : { left: `${value}%` }}
        >
          <span className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#d4af77] bg-[#0b0b0b] text-[#d4af77]">
            ⇆
          </span>
        </div>

        <span className="absolute start-4 bottom-4 rounded-full bg-black/55 px-3 py-1 text-[10px] tracking-[0.22em] text-white/80 uppercase">
          {t.luxury.beforeLabel}
        </span>
        <span className="absolute end-4 bottom-4 rounded-full bg-[#d4af77]/90 px-3 py-1 text-[10px] tracking-[0.22em] text-black uppercase">
          {t.luxury.afterLabel}
        </span>
      </div>
    </section>
  );
}
