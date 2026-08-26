"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { BeforeAfter } from "./luxury/BeforeAfter";
import { GoldAtmosphere } from "./luxury/GoldAtmosphere";
import { ScentExperienceIntro } from "./luxury/ScentExperienceIntro";
import { ScrollBottle } from "./luxury/ScrollBottle";
import { SiteFooter, SiteHeader } from "./SiteChrome";
import { useLang } from "./LanguageProvider";
import { moods, scents, type MoodId, type ScentId } from "@/lib/scents";

const sampleNotes = [
  {
    quote:
      "The scent instantly changed the atmosphere of my home. Elegant, subtle and incredibly long-lasting.",
    name: "Areej",
    city: "Riyadh",
  },
  {
    quote:
      "A beautiful fragrance with a truly luxurious Arabian character. I keep one in my car and one at home.",
    name: "Fahad",
    city: "Dubai",
  },
  {
    quote: "Not just an air freshener — it feels like a signature scent for the entire space.",
    name: "Layan",
    city: "Jeddah",
  },
  {
    quote: "The oud and musk notes are perfectly balanced. Sophisticated without being overpowering.",
    name: "Omar",
    city: "Doha",
  },
];

function Stars() {
  return (
    <span className="flex gap-0.5 text-[#d4af77]" aria-label="5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current">
          <path d="M10 1.6 12.5 7l6 .5-4.6 3.9 1.4 5.8L10 14.6 4.7 17.2l1.4-5.8L1.5 7.5l6-.5L10 1.6z" />
        </svg>
      ))}
    </span>
  );
}

export function HomePage() {
  const { t } = useLang();
  const [activeId, setActiveId] = useState<ScentId>("midnight-oud");
  const active = useMemo(
    () => scents.find((scent) => scent.id === activeId) ?? scents[0],
    [activeId],
  );

  const selectMood = (mood: MoodId) => {
    const match = scents.find((scent) => scent.mood === mood);
    if (match) setActiveId(match.id);
  };

  const spaces = [
    { key: "homes" as const, image: "/slides/slide-mino-skydust.png", title: t.luxury.spaceHomes, body: t.luxury.spaceHomesBody },
    { key: "cars" as const, image: "/slides/slide-car-skydust.png", title: t.luxury.spaceCars, body: t.luxury.spaceCarsBody },
    { key: "offices" as const, image: "/slides/slide-trio-skydust.png", title: t.luxury.spaceOffices, body: t.luxury.spaceOfficesBody },
    { key: "hotels" as const, image: "/slides/slide-lobby-skydust.png", title: t.luxury.spaceHotels, body: t.luxury.spaceHotelsBody },
  ];

  const stats = [
    t.luxury.statYears,
    t.luxury.statCustomers,
    t.luxury.statRating,
    t.luxury.statLasting,
  ];

  return (
    <div className="flex min-h-full flex-1 flex-col bg-[#070707] text-[#f4eee3]">
      <ScentExperienceIntro />
      <SiteHeader variant="luxury" />
      <main>
        <section className="relative min-h-[92vh] overflow-hidden">
          <Image
            src="/luxury/luxury-dark-bg.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-[#070707]" />
          <GoldAtmosphere density={55} />
          <div className="relative z-10 mx-auto grid min-h-[92vh] max-w-[1400px] items-center gap-8 px-4 py-16 md:grid-cols-2 md:px-8">
            <div className="max-w-xl">
              <p className="text-[11px] tracking-[0.42em] text-[#c9a96a] uppercase">
                {t.luxury.heroEyebrow}
              </p>
              <h1 className="font-display mt-5 text-5xl leading-[1.05] text-[#f3e6c8] md:text-7xl">
                {t.luxury.heroTitle}
              </h1>
              <p className="mt-6 max-w-md text-sm leading-7 text-white/65">{t.luxury.heroBody}</p>
              <Link
                href="#scent-collection"
                className="mt-10 inline-flex border border-[#c9a96a] px-7 py-3 text-[11px] tracking-[0.28em] text-[#f3e6c8] uppercase transition hover:bg-[#c9a96a] hover:text-[#111]"
              >
                {t.luxury.exploreCollection}
              </Link>
            </div>
            <div className="relative mx-auto h-[58vh] w-full max-w-lg md:h-[74vh]">
              <div className="absolute inset-x-[12%] top-[18%] bottom-[10%] rounded-full bg-[#d4af77]/18 blur-3xl" />
              <Image
                src="/luxury/luxury-bottle-hero.png"
                alt="SKYDUST signature bottle"
                fill
                priority
                sizes="(min-width: 768px) 32rem, 90vw"
                className="luxury-hero-bottle object-contain"
              />
            </div>
          </div>
        </section>

        <section className="border-y border-white/8 px-4 py-24 text-center md:px-8">
          <p className="font-display text-5xl text-[#f3e6c8] md:text-7xl">{t.luxury.yearsTitle}</p>
          <p className="mx-auto mt-8 max-w-2xl text-sm leading-8 text-white/60 md:text-base">
            {t.luxury.yearsBody}
          </p>
        </section>

        <section id="scent-collection" className="scroll-mt-28 px-4 py-24 md:px-8">
          <div className="mx-auto max-w-[1400px]">
            <p className="text-center text-[11px] tracking-[0.38em] text-[#c9a96a] uppercase">
              {t.luxury.scentCollectionHint}
            </p>
            <h2 className="font-display mt-4 text-center text-4xl text-[#f3e6c8] md:text-5xl">
              {t.luxury.scentCollectionTitle}
            </h2>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {scents.map((scent) => {
                const selected = scent.id === activeId;
                return (
                  <button
                    key={scent.id}
                    type="button"
                    onClick={() => setActiveId(scent.id)}
                    className={`group text-start ${selected ? "ring-1 ring-[#c9a96a]" : "ring-1 ring-white/10"}`}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-[#111]">
                      <Image
                        src={scent.image}
                        alt={t.luxury[scent.nameKey]}
                        fill
                        sizes="(min-width: 1024px) 22vw, 50vw"
                        className="object-cover transition duration-700 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <h3 className="font-display text-2xl text-[#f3e6c8]">
                          {t.luxury[scent.nameKey]}
                        </h3>
                        <p className="mt-1 text-[11px] tracking-[0.18em] text-white/60 uppercase">
                          {t.luxury[scent.moodKey]}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-10 md:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-3xl text-[#f3e6c8] md:text-4xl">
              {t.luxury.selectorTitle}
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {moods.map((mood) => {
                const selected = active.mood === mood;
                const label =
                  mood === "relaxed"
                    ? t.luxury.moodRelaxed
                    : mood === "luxurious"
                      ? t.luxury.moodLuxurious
                      : mood === "fresh"
                        ? t.luxury.moodFresh
                        : t.luxury.moodMysterious;
                return (
                  <button
                    key={mood}
                    type="button"
                    onClick={() => selectMood(mood)}
                    className={`px-5 py-2.5 text-[11px] tracking-[0.22em] uppercase transition ${
                      selected
                        ? "bg-[#c9a96a] text-[#111]"
                        : "border border-white/15 text-white/70 hover:border-[#c9a96a] hover:text-[#f3e6c8]"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            <p className="mt-6 text-sm text-white/50">
              {t.luxury[active.nameKey]} · {t.luxury[active.moodKey]}
            </p>
          </div>
        </section>

        <BeforeAfter />

        <section className="px-4 py-16 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] tracking-[0.38em] text-[#c9a96a] uppercase">
              {t.luxury[active.nameKey]}
            </p>
            <h2 className="font-display mt-3 text-4xl text-[#f3e6c8]">{t.luxury.notesTitle}</h2>
            <div className="mt-12 space-y-4">
              {(
                [
                  ["top", t.luxury.topNotes, active.notes.top],
                  ["heart", t.luxury.heartNotes, active.notes.heart],
                  ["base", t.luxury.baseNotes, active.notes.base],
                ] as const
              ).map(([id, label, notes], index) => (
                <div
                  key={id}
                  className="mx-auto border border-white/10 bg-white/3 px-6 py-5"
                  style={{ maxWidth: `${72 + index * 10}%` }}
                >
                  <p className="text-[10px] tracking-[0.32em] text-[#c9a96a] uppercase">{label}</p>
                  <p className="mt-2 text-sm text-white/75">{notes.join(" · ")}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ScrollBottle />

        <section className="px-4 py-24 md:px-8">
          <div className="mx-auto max-w-[1400px]">
            <h2 className="font-display text-center text-4xl text-[#f3e6c8] md:text-5xl">
              {t.luxury.spacesTitle}
            </h2>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {spaces.map((space) => (
                <article key={space.key} className="group overflow-hidden border border-white/10">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={space.image}
                      alt={space.title}
                      fill
                      sizes="(min-width: 1024px) 22vw, 50vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <h3 className="font-display text-2xl text-[#f3e6c8]">{space.title}</h3>
                      <p className="mt-2 text-xs leading-5 text-white/65">{space.body}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 md:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-center text-4xl text-[#f3e6c8]">{t.luxury.reviewsTitle}</h2>
            <p className="mt-3 text-center text-[11px] tracking-[0.22em] text-white/35 uppercase">
              {t.luxury.reviewsHint}
            </p>
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {sampleNotes.map((note) => (
                <article key={note.name} className="border border-white/10 bg-white/3 px-6 py-7">
                  <Stars />
                  <p className="mt-4 text-sm leading-7 text-white/75">“{note.quote}”</p>
                  <p className="mt-5 text-xs tracking-[0.18em] text-[#c9a96a] uppercase">
                    — {note.name}, {note.city}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/8 px-4 py-16 md:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <p
                key={stat}
                className="font-display text-center text-2xl tracking-wide text-[#f3e6c8] md:text-3xl"
              >
                {stat}
              </p>
            ))}
          </div>
        </section>

        <section className="px-4 py-28 text-center md:px-8">
          <p className="text-[11px] tracking-[0.38em] text-[#c9a96a] uppercase">{t.luxury.ctaKicker}</p>
          <Link
            href="/shop"
            className="font-display mt-6 inline-block text-4xl text-[#f3e6c8] transition hover:text-[#c9a96a] md:text-6xl"
          >
            {t.luxury.cta}
          </Link>
        </section>
      </main>
      <SiteFooter variant="luxury" />
    </div>
  );
}
