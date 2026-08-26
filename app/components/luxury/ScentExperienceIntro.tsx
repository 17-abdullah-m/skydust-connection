"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLang } from "../LanguageProvider";
import { GoldAtmosphere } from "./GoldAtmosphere";

const STORAGE_KEY = "skydust-scent-experience";

export function ScentExperienceIntro() {
  const { t } = useLang();
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    if (!reduce && !seen) setShow(true);
  }, []);

  useEffect(() => {
    if (!show) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [show]);

  const close = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setLeaving(true);
    window.setTimeout(() => setShow(false), 700);
  };

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#050505] text-center ${
        leaving ? "luxury-intro-leave" : ""
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={t.luxury.introLine1}
    >
      <GoldAtmosphere density={90} />
      <div className="luxury-intro-glow" />

      <button
        type="button"
        onClick={close}
        className="absolute end-5 top-5 z-10 text-[11px] tracking-[0.28em] text-white/45 uppercase transition hover:text-white/80"
      >
        {t.luxury.skipIntro}
      </button>

      <div className="relative z-10 flex max-w-3xl flex-col items-center px-6">
        <div className="scent-intro-bottle relative mb-8 h-[42vh] w-full max-w-md md:h-[48vh]">
          <div className="absolute inset-x-[18%] bottom-[8%] top-[22%] rounded-full bg-[#d4af77]/20 blur-3xl" />
          <Image
            src="/luxury/luxury-bottle-hero.png"
            alt=""
            fill
            priority
            sizes="(min-width: 768px) 28rem, 90vw"
            className="object-contain mix-blend-screen [mask-image:radial-gradient(ellipse_at_center,black_46%,transparent_78%)]"
          />
        </div>

        <p className="scent-intro-title font-display text-[clamp(1.7rem,5vw,3.4rem)] leading-[1.12] font-semibold tracking-[0.08em] text-[#f3e6c8]">
          {t.luxury.introLine1}
          <br />
          {t.luxury.introLine2}
        </p>
        <p className="scent-intro-craft mt-6 text-[11px] tracking-[0.42em] text-[#c9a96a] uppercase">
          {t.luxury.introCraft}
        </p>
        <button
          type="button"
          onClick={close}
          className="scent-intro-cta mt-10 border border-[#c9a96a]/70 px-8 py-3 text-[11px] tracking-[0.32em] text-[#f3e6c8] uppercase transition hover:bg-[#c9a96a] hover:text-[#111]"
        >
          {t.luxury.exploreCollection}
        </button>
      </div>
    </div>
  );
}
