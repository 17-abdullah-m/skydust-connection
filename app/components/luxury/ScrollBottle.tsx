"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLang } from "../LanguageProvider";

export function ScrollBottle() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("translateY(0px) rotateY(0deg)");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const progress = 1 - Math.min(1, Math.max(0, rect.top / (vh * 1.05)));
      const rotate = -10 + progress * 28;
      const float = Math.sin(progress * Math.PI) * -28;
      setTransform(`translateY(${float}px) rotateY(${rotate}deg)`);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,106,0.16),transparent_58%)]" />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2 md:px-8">
        <div className="luxury-bottle-stage relative mx-auto h-[460px] w-full max-w-sm md:h-[540px]">
          <div
            className="luxury-bottle-float absolute inset-0"
            style={{ transform, transformStyle: "preserve-3d" }}
          >
            <Image
              src="/luxury/luxury-bottle-hero.png"
              alt=""
              fill
              sizes="24rem"
              className="object-contain mix-blend-screen [mask-image:radial-gradient(ellipse_at_center,black_48%,transparent_80%)] drop-shadow-[0_40px_70px_rgba(212,175,119,0.22)]"
            />
          </div>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.38em] text-[#c9a96a] uppercase">
            {t.luxury.bottleKicker}
          </p>
          <h2 className="font-display mt-4 text-4xl text-[#f3e6c8] md:text-5xl">
            {t.luxury.bottleTitle}
          </h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-white/60">{t.luxury.bottleBody}</p>
        </div>
      </div>
    </section>
  );
}
