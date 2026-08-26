"use client";

import Image from "next/image";
import Link from "next/link";

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

const loop = [...slides, ...slides];

export function HeroSlideshow() {
  return (
    <section className="relative overflow-hidden bg-neutral-100" aria-label="Product slideshow">
      <div className="hero-slide-track flex">
        {loop.map((slide, index) => (
          <Link
            key={`${slide.src}-${index}`}
            href={slide.href}
            className="relative h-[48vh] w-screen shrink-0 sm:h-[64vh] lg:h-[72vh]"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
