"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    src: "/slides/slide-mino-skydust.png",
    href: "/products/desk-mino",
    alt: "SKYDUST MINO desktop diffuser",
  },
  {
    src: "/slides/slide-trio-skydust.png",
    href: "/products/scent-trio",
    alt: "SKYDUST Scent Trio",
  },
  {
    src: "/slides/slide-lobby-skydust.png",
    href: "/collections/diffusers",
    alt: "SKYDUST commercial diffuser",
  },
  {
    src: "/slides/slide-car-skydust.png",
    href: "/collections/car-diffusers",
    alt: "SKYDUST car diffuser",
  },
  {
    src: "/slides/slide-oils-skydust.png",
    href: "/collections/aroma-oils",
    alt: "SKYDUST aroma oils",
  },
];

export function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current === slides.length - 1 ? 0 : current + 1));
    }, 4000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-neutral-100" aria-roledescription="carousel">
      <Link href={slide.href} className="block">
        <Image
          src={slide.src}
          alt={slide.alt}
          width={1920}
          height={900}
          priority
          className="h-[48vh] w-full object-cover sm:h-[64vh] lg:h-[72vh]"
        />
      </Link>
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => setIndex((i) => (i === 0 ? slides.length - 1 : i - 1))}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 px-3 py-2 text-lg shadow-sm"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => setIndex((i) => (i === slides.length - 1 ? 0 : i + 1))}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 px-3 py-2 text-lg shadow-sm"
      >
        ›
      </button>
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((item, dot) => (
          <button
            key={item.src}
            type="button"
            aria-label={`Go to slide ${dot + 1}`}
            onClick={() => setIndex(dot)}
            className={`h-2.5 w-2.5 rounded-full ${dot === index ? "bg-white" : "bg-white/50"}`}
          />
        ))}
      </div>
    </section>
  );
}
