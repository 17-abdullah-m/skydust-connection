export type ProductKind = "bottle" | "diffuser";

export type Product = {
  slug: string;
  title: string;
  price: number;
  compareAt?: number;
  image: string;
  collection: string;
  tags: string[];
  blurb: string;
  kind: ProductKind;
  scent: string;
  volume: string;
  labelKind: string;
  labelUse: string;
  stock: number;
};

const scents = [
  ["midnight-oud", "Midnight Oud", "Deep oud for quiet evening rooms."],
  ["velvet-rose", "Velvet Rose", "Soft rose that lingers without shouting."],
  ["white-musk", "White Musk", "Clean musk for airy, open spaces."],
  ["arabian-amber", "Arabian Amber", "Warm amber with a golden trail."],
  ["desert-sage", "Desert Sage", "Dry herbs and cool air."],
  ["royal-saffron", "Royal Saffron", "Saffron spice over smooth woods."],
  ["ocean-linen", "Ocean Linen", "Fresh linen with a light sea breeze."],
  ["black-tea", "Black Tea", "Steeped tea and soft smoke."],
  ["golden-amber", "Golden Amber", "Honeyed amber for lobbies and halls."],
  ["silk-peony", "Silk Peony", "Powdery peony for bedrooms."],
  ["cedar-mist", "Cedar Mist", "Cedarwood with a cool mist finish."],
  ["night-jasmine", "Night Jasmine", "Night-blooming jasmine, low and elegant."],
  ["fresh-bergamot", "Fresh Bergamot", "Bright citrus for daytime rooms."],
  ["sandalwood-glow", "Sandalwood Glow", "Creamy sandalwood that stays close."],
  ["vanilla-smoke", "Vanilla Smoke", "Warm vanilla with a thin incense line."],
  ["fig-orchard", "Fig Orchard", "Green fig and sun-warmed leaves."],
  ["lemon-verbena", "Lemon Verbena", "Sharp lemon and garden herbs."],
  ["rosewood", "Rosewood", "Polished woods with a quiet floral edge."],
  ["incense-noir", "Incense Noir", "Dark incense for evenings and cars."],
  ["honey-tobacco", "Honey Tobacco", "Sweet tobacco leaf, never heavy."],
  ["white-tea", "White Tea", "Pale tea and clean air."],
  ["pink-pepper", "Pink Pepper", "Pepper sparkle over soft musk."],
  ["orange-blossom", "Orange Blossom", "Neroli brightness for washrooms and foyers."],
  ["rain-vetiver", "Rain Vetiver", "Wet earth and vetiver after rain."],
] as const;

function stockFor(prefix: string, index: number) {
  const soldOut = new Set([
    "oil-2",
    "oil-18",
    "diffuser-4",
    "diffuser-21",
    "reeds-7",
    "candle-11",
    "spray-3",
    "spray-16",
  ]);
  if (soldOut.has(`${prefix}-${index}`)) return 0;
  return 5 + ((index * 23 + prefix.charCodeAt(0) * 9) % 44);
}

function item(
  slug: string,
  title: string,
  price: number,
  image: string,
  collection: string,
  tags: string[],
  blurb: string,
  extra: {
    kind: ProductKind;
    scent: string;
    volume: string;
    labelKind: string;
    labelUse: string;
    stock: number;
    compareAt?: number;
  },
): Product {
  return {
    slug,
    title,
    price,
    image,
    collection,
    tags,
    blurb,
    compareAt: extra.compareAt,
    kind: extra.kind,
    scent: extra.scent,
    volume: extra.volume,
    labelKind: extra.labelKind,
    labelUse: extra.labelUse,
    stock: extra.stock,
  };
}

export type PhotoKind = "bottle" | "diffuser" | "candle";

function scentPhoto(kind: PhotoKind, slug: string) {
  return `/products/scents/${kind}-${slug}.png`;
}

function line(opts: {
  prefix: string;
  titleOf: (name: string) => string;
  collection: string;
  tags: string[];
  kind: ProductKind;
  photo?: PhotoKind;
  volume: string;
  labelKind: string;
  labelUse: string;
  basePrice: number;
  step: number;
  extra: string;
}): Product[] {
  const photo = opts.photo ?? opts.kind;
  return scents.map(([slug, name, note], index) =>
    item(
      `${opts.prefix}-${slug}`,
      opts.titleOf(name),
      opts.basePrice + index * opts.step,
      scentPhoto(photo, slug),
      opts.collection,
      opts.tags,
      `${note} ${opts.extra}`,
      {
        kind: opts.kind,
        scent: name,
        volume: opts.volume,
        labelKind: opts.labelKind,
        labelUse: opts.labelUse,
        stock: stockFor(opts.prefix, index),
      },
    ),
  );
}

const catalog = [
  {
    prefix: "diffuser",
    titleOf: (name: string) => `${name} Diffuser`,
    collection: "room-diffusers",
    kind: "diffuser" as const,
    volume: "400 ml",
    labelKind: "Scent Diffuser",
    labelUse: "Automatic scenting for rooms",
    basePrice: 11800,
    step: 920,
    extra: "Desktop and room machine for home, office, and suites.",
  },
  {
    prefix: "car-diffuser",
    titleOf: (name: string) => `${name} Car Diffuser`,
    collection: "car-diffusers",
    kind: "diffuser" as const,
    volume: "80 ml",
    labelKind: "Car Diffuser",
    labelUse: "Clip-in scenting for cars",
    basePrice: 6900,
    step: 410,
    extra: "Compact diffuser for cars and small cabins.",
  },
  {
    prefix: "ecoscent",
    titleOf: (name: string) => `${name} Ecoscent Diffuser`,
    collection: "ecoscent-diffusers",
    kind: "diffuser" as const,
    volume: "500 ml",
    labelKind: "Ecoscent",
    labelUse: "Low-energy commercial scenting",
    basePrice: 15400,
    step: 880,
    extra: "Quiet commercial diffuser for lobbies and retail floors.",
  },
  {
    prefix: "plugin",
    titleOf: (name: string) => `${name} Plug In Diffuser`,
    collection: "plug-in-diffusers",
    kind: "diffuser" as const,
    volume: "120 ml",
    labelKind: "Plug In Diffuser",
    labelUse: "Wall outlet scenting",
    basePrice: 8200,
    step: 390,
    extra: "Plug-in machine for washrooms, corridors, and desks.",
  },
  {
    prefix: "splash",
    titleOf: (name: string) => `${name} Scent Splash Diffuser`,
    collection: "scent-splash-diffusers",
    kind: "diffuser" as const,
    volume: "300 ml",
    labelKind: "Scent Splash",
    labelUse: "Burst scenting for entries",
    basePrice: 9900,
    step: 510,
    extra: "Short-burst diffuser for foyers and guest entries.",
  },
  {
    prefix: "bundle-car",
    titleOf: (name: string) => `${name} Car Diffuser Pair`,
    collection: "bundle-car-diffusers",
    kind: "diffuser" as const,
    volume: "2 × 80 ml",
    labelKind: "Car Bundle",
    labelUse: "Two machines · one scent",
    basePrice: 11900,
    step: 600,
    extra: "Two car diffusers in one offer, same scent.",
  },
  {
    prefix: "trio",
    titleOf: (name: string) => `${name} Scent Trio`,
    collection: "scent-trio",
    kind: "diffuser" as const,
    volume: "3 × 400 ml",
    labelKind: "Scent Trio",
    labelUse: "Three-room starter set",
    basePrice: 28900,
    step: 1100,
    extra: "Three matching room diffusers as a bundle.",
  },
  {
    prefix: "oil",
    titleOf: (name: string) => `${name} Oil`,
    collection: "aroma-oils-diffusers",
    kind: "bottle" as const,
    volume: "500 ml",
    labelKind: "Aroma Oil",
    labelUse: "For electronic scent machines",
    basePrice: 2100,
    step: 185,
    extra: "Oil refill for electronic scent machines.",
  },
  {
    prefix: "hotel-oil",
    titleOf: (name: string) => `${name} Hotel Oil`,
    collection: "hotel-oils",
    kind: "bottle" as const,
    volume: "1000 ml",
    labelKind: "Hotel Aroma Oil",
    labelUse: "For lobby and suite machines",
    basePrice: 8900,
    step: 210,
    extra: "Larger hotel oil for continuous lobby scenting.",
  },
  {
    prefix: "cartridge",
    titleOf: (name: string) => `${name} Car Cartridge`,
    collection: "car-cartridges",
    kind: "bottle" as const,
    volume: "10 ml",
    labelKind: "Car Cartridge",
    labelUse: "For car diffuser machines",
    basePrice: 950,
    step: 70,
    extra: "Cartridge refill for car diffusers.",
  },
  {
    prefix: "mino",
    titleOf: (name: string) => `${name} MINO Oil`,
    collection: "mino-oils",
    kind: "bottle" as const,
    volume: "100 ml",
    labelKind: "MINO Oil",
    labelUse: "For MINO desktop machines",
    basePrice: 1400,
    step: 90,
    extra: "Compact oil for MINO desktop units.",
  },
  {
    prefix: "sample",
    titleOf: (name: string) => `${name} Sample`,
    collection: "samples",
    kind: "bottle" as const,
    volume: "10 ml",
    labelKind: "Scent Sample",
    labelUse: "Try before a full refill",
    basePrice: 350,
    step: 40,
    extra: "Small sample bottle to test a scent in one room.",
  },
  {
    prefix: "reeds-premium",
    titleOf: (name: string) => `${name} Premium Reeds`,
    collection: "premium-reeds",
    kind: "bottle" as const,
    volume: "250 ml",
    labelKind: "Premium Reeds",
    labelUse: "Includes rattan reeds",
    basePrice: 3900,
    step: 410,
    extra: "Premium reed diffuser, 150 ml & 250 ml range.",
  },
  {
    prefix: "reeds-500",
    titleOf: (name: string) => `${name} Luxury Reeds 500ml`,
    collection: "luxury-reeds-500",
    kind: "bottle" as const,
    volume: "500 ml",
    labelKind: "Luxury Reeds",
    labelUse: "Includes rattan reeds",
    basePrice: 7200,
    step: 480,
    extra: "Luxury reed diffuser in 500 ml.",
  },
  {
    prefix: "reeds-1000",
    titleOf: (name: string) => `${name} Luxury Reeds 1000ml`,
    collection: "luxury-reeds-1000",
    kind: "bottle" as const,
    volume: "1000 ml",
    labelKind: "Luxury Reeds",
    labelUse: "Includes rattan reeds",
    basePrice: 11800,
    step: 620,
    extra: "Large luxury reed diffuser in 1000 ml.",
  },
  {
    prefix: "reeds-2800",
    titleOf: (name: string) => `${name} Luxury Reeds 2800ml`,
    collection: "luxury-reeds-2800",
    kind: "bottle" as const,
    volume: "2800 ml",
    labelKind: "Luxury Reeds",
    labelUse: "Includes rattan reeds",
    basePrice: 24900,
    step: 900,
    extra: "Statement reed diffuser in 2800 ml.",
  },
  {
    prefix: "reeds-pref",
    titleOf: (name: string) => `${name} Premium Reeds Refill`,
    collection: "premium-reeds-refill",
    kind: "bottle" as const,
    volume: "250 ml",
    labelKind: "Premium Refill",
    labelUse: "Reed oil refill only",
    basePrice: 2900,
    step: 260,
    extra: "Refill oil for premium reed bottles.",
  },
  {
    prefix: "reeds-lref",
    titleOf: (name: string) => `${name} Luxury Reeds Refill`,
    collection: "luxury-reeds-refill",
    kind: "bottle" as const,
    volume: "500 ml",
    labelKind: "Luxury Refill",
    labelUse: "Reed oil refill only",
    basePrice: 5400,
    step: 310,
    extra: "Refill oil for luxury reed bottles.",
  },
  {
    prefix: "candle",
    titleOf: (name: string) => `${name} Candle`,
    collection: "candles",
    kind: "bottle" as const,
    photo: "candle" as const,
    volume: "200 g",
    labelKind: "Scented Candle",
    labelUse: "Soy wax · slow burn",
    basePrice: 3600,
    step: 95,
    extra: "Scented candle with a slow, even burn.",
  },
  {
    prefix: "spray-premium",
    titleOf: (name: string) => `${name} Premium Spray`,
    collection: "premium-spray",
    kind: "bottle" as const,
    volume: "500 ml",
    labelKind: "Premium Room Spray",
    labelUse: "Rooms, linen & cars",
    basePrice: 4800,
    step: 140,
    extra: "Premium room spray for a quick lift.",
  },
  {
    prefix: "spray-luxury",
    titleOf: (name: string) => `${name} Luxury Spray`,
    collection: "luxury-spray",
    kind: "bottle" as const,
    volume: "500 ml",
    labelKind: "Luxury Room Spray",
    labelUse: "Suites, linen & cars",
    basePrice: 6900,
    step: 180,
    extra: "Luxury room spray with a longer trail.",
  },
];

export const products: Product[] = catalog.flatMap((entry) =>
  line({ ...entry, tags: [entry.collection] }),
);

export type Collection = {
  slug: string;
  title: string;
  image: string;
  featured?: boolean;
};

export const collections: Collection[] = [
  { slug: "diffusers", title: "Scent Diffusers", image: "/collections/diffusers.png", featured: true },
  { slug: "aroma-oils", title: "Aroma Oils", image: "/collections/oils.png", featured: true },
  { slug: "reeds", title: "Reeds Diffusers", image: "/collections/reeds.png", featured: true },
  { slug: "candles", title: "Scented Candles", image: "/collections/candles.png", featured: true },
  { slug: "room-spray", title: "Room Spray", image: "/collections/spray.png", featured: true },
  { slug: "room-diffusers", title: "Diffusers", image: "/collections/diffusers.png" },
  { slug: "car-diffusers", title: "Diffusers For Cars", image: "/collections/diffusers.png" },
  { slug: "ecoscent-diffusers", title: "Ecoscent Diffusers", image: "/collections/diffusers.png" },
  { slug: "plug-in-diffusers", title: "Plug In Diffusers", image: "/collections/diffusers.png" },
  { slug: "scent-splash-diffusers", title: "Scent Splash Diffusers", image: "/collections/diffusers.png" },
  { slug: "bundle-car-diffusers", title: "Car Diffuser Bundles", image: "/collections/diffusers.png" },
  { slug: "scent-trio", title: "Scent Trio Diffuser", image: "/collections/diffusers.png" },
  { slug: "aroma-oils-diffusers", title: "Aroma Oils for Diffusers", image: "/collections/oils.png" },
  { slug: "hotel-oils", title: "Hotel Aroma Oils for Diffusers", image: "/collections/oils.png" },
  { slug: "mino-oils", title: "MINO Oils", image: "/collections/oils.png" },
  { slug: "car-cartridges", title: "Cartridge For Car Diffuser", image: "/collections/oils.png" },
  { slug: "premium-reeds", title: "Premium Reeds 150ml & 250ml", image: "/collections/reeds.png" },
  { slug: "luxury-reeds-500", title: "Luxury Reeds 500ml", image: "/collections/reeds.png" },
  { slug: "luxury-reeds-1000", title: "Luxury Reeds 1000ml", image: "/collections/reeds.png" },
  { slug: "luxury-reeds-2800", title: "Luxury Reeds 2800ml", image: "/collections/reeds.png" },
  { slug: "premium-reeds-refill", title: "Premium Reeds Refills", image: "/collections/reeds.png" },
  { slug: "luxury-reeds-refill", title: "Luxury Reeds Refill", image: "/collections/reeds.png" },
  { slug: "premium-spray", title: "Premium Room Spray 500ML", image: "/collections/spray.png" },
  { slug: "luxury-spray", title: "Luxury Room Spray 500ML", image: "/collections/spray.png" },
  { slug: "bundles", title: "Bundle Offers", image: "/collections/diffusers.png" },
  { slug: "samples", title: "Samples", image: "/collections/oils.png" },
];

export const featuredCollections = collections.filter((item) => item.featured);

export const megaNav = [
  {
    label: "Clients",
    href: "/clients",
  },
  {
    label: "Aroma Oils",
    href: "/collections/aroma-oils",
    children: [
      { href: "/collections/hotel-oils", label: "Luxury Hotel's Aroma Oils for Diffusers" },
      { href: "/collections/aroma-oils-diffusers", label: "Aroma Oils for Diffusers" },
      { href: "/collections/car-cartridges", label: "Cartridge for Car Diffusers" },
      { href: "/collections/mino-oils", label: "MINO Oils" },
    ],
  },
  {
    label: "Scent Diffusers",
    href: "/collections/diffusers",
    children: [
      { href: "/collections/car-diffusers", label: "Car Diffusers" },
      { href: "/collections/room-diffusers", label: "Diffusers" },
    ],
  },
  {
    label: "Reeds Diffusers",
    href: "/collections/reeds",
    children: [
      { href: "/collections/premium-reeds", label: "Premium Reeds 150 ml & 250 ml" },
      { href: "/collections/luxury-reeds-500", label: "Luxury Reeds 500ml" },
      { href: "/collections/luxury-reeds-1000", label: "Luxury Reeds 1000ml" },
      { href: "/collections/luxury-reeds-2800", label: "Luxury Reeds 2800ml" },
      { href: "/collections/premium-reeds-refill", label: "Premium Reeds Refills" },
      { href: "/collections/luxury-reeds-refill", label: "Luxury Reeds Refill" },
    ],
  },
  { label: "Scented Candles", href: "/collections/candles" },
  {
    label: "Room Spray",
    href: "/collections/room-spray",
    children: [
      { href: "/collections/premium-spray", label: "Premium Room Spray 500ML" },
      { href: "/collections/luxury-spray", label: "Luxury Room Spray 500ML" },
    ],
  },
  {
    label: "Bundle Offers",
    href: "/collections/bundles",
    children: [
      { href: "/collections/bundle-car-diffusers", label: "Car Diffusers" },
      { href: "/collections/ecoscent-diffusers", label: "Ecoscent Diffusers" },
      { href: "/collections/scent-trio", label: "Scent Trio Diffuser" },
      { href: "/collections/plug-in-diffusers", label: "Plug In Diffusers" },
      { href: "/collections/scent-splash-diffusers", label: "Scent Splash Diffusers" },
    ],
  },
  {
    label: "Others",
    href: "/others",
    children: [
      { href: "/about", label: "About Us" },
      { href: "/videos", label: "Video Tutorials" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
  { label: "Book An Appointment", href: "/get-started" },
];

export const countries = ["OMAN", "PAKISTAN"] as const;

/** 1 OMR ≈ 720 PKR — used to show Oman prices alongside PKR. */
export const PKR_PER_OMR = 720;

export function pkrToOmr(pkr: number) {
  return pkr / PKR_PER_OMR;
}

export function formatPrice(value: number) {
  return `Rs. ${value.toLocaleString("en-US")}.00`;
}

export function formatOmr(pkr: number) {
  return `OMR ${pkrToOmr(pkr).toLocaleString("en-US", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  })}`;
}

export function getProduct(slug: string) {
  return products.find((item) => item.slug === slug);
}

export function getCollection(slug: string) {
  return collections.find((item) => item.slug === slug);
}

export function productsIn(slug: string) {
  if (slug === "all") return products;
  return products.filter(
    (item) => item.collection === slug || item.tags.includes(slug),
  );
}

export function isInStock(product: Product) {
  return product.stock > 0;
}

export function navChildrenFor(href: string) {
  return megaNav.find((item) => item.href === href)?.children ?? [];
}

export function collectionSlugFromHref(href: string) {
  const prefix = "/collections/";
  return href.startsWith(prefix) ? href.slice(prefix.length) : null;
}
