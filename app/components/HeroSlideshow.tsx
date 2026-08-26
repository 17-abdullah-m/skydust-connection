"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const slides = [
  {
    src: "/hero-skydust-banner.png",
    alt: "SKYDUST desktop scent diffuser",
  },
  {
    src: "/air-freshener-saas-hero.png",
    alt: "SKYDUST automatic refill",
  },
];

export function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  return (
    <section className="relative bg-neutral-100">
      <Link href="/collections/diffusers" className="block">
        <Image
          src={slide.src}
          alt={slide.alt}
          width={1920}
          height={900}
          priority
          className="h-[52vh] w-full object-cover sm:h-[70vh]"
        />
      </Link>
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => setIndex((i) => (i === 0 ? slides.length - 1 : i - 1))}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 px-3 py-2 text-sm"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => setIndex((i) => (i === slides.length - 1 ? 0 : i + 1))}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 px-3 py-2 text-sm"
      >
        ›
      </button>
    </section>
  );
}
