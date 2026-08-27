export type Product = {
  slug: string;
  title: string;
  price: number;
  compareAt?: number;
  image: string;
  collection: string;
  tags: string[];
  blurb: string;
};

const img = {
  mini: "/products/product-mini-desk.png",
  euca: "/products/product-eucalyptus-diffuser.png",
  citrus: "/products/product-citrus-diffuser.png",
  night: "/products/product-night-bloom.png",
  lobby: "/products/product-lobby-pro.png",
  kit: "/products/product-starter-kit.png",
  oil: "/products/product-aroma-oil.png",
  trio: "/products/product-refill-trio.png",
  linen: "/products/product-linen-cartridge.png",
  reeds: "/products/product-luxury-reeds.png",
  spray: "/products/product-room-spray.png",
  candle: "/products/product-scented-candle.png",
};

const diffuserPhotos = [img.mini, img.euca, img.citrus, img.night, img.lobby, img.kit];

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

function item(
  slug: string,
  title: string,
  price: number,
  image: string,
  collection: string,
  tags: string[],
  blurb: string,
  compareAt?: number,
): Product {
  return { slug, title, price, image, collection, tags, blurb, compareAt };
}

function line(
  prefix: string,
  titleOf: (name: string) => string,
  collection: string,
  tags: string[],
  photos: string[],
  basePrice: number,
  step: number,
  extra: string,
): Product[] {
  return scents.map(([slug, name, note], index) =>
    item(
      `${prefix}-${slug}`,
      titleOf(name),
      basePrice + index * step,
      photos[index % photos.length],
      collection,
      tags,
      `${note} ${extra}`,
    ),
  );
}

export const products: Product[] = [
  ...line(
    "diffuser",
    (name) => `${name} Diffuser`,
    "diffusers",
    ["diffusers", "car-diffusers", "bundles"],
    diffuserPhotos,
    11800,
    920,
    "Automatic air freshener for home, office, and hotel rooms.",
  ),
  ...line(
    "oil",
    (name) => `${name} Oil`,
    "aroma-oils",
    ["aroma-oils", "hotel-oils", "mino-oils", "car-cartridges", "samples"],
    [img.oil, img.linen, img.trio],
    2100,
    185,
    "Oil refill for electronic scent machines.",
  ),
  ...line(
    "reeds",
    (name) => `${name} Reeds`,
    "reeds",
    [
      "reeds",
      "premium-reeds",
      "luxury-reeds-500",
      "luxury-reeds-1000",
      "luxury-reeds-2800",
      "premium-reeds-refill",
      "luxury-reeds-refill",
    ],
    [img.reeds],
    3900,
    410,
    "Reed diffuser for living rooms, suites, and desks.",
  ),
  ...line(
    "candle",
    (name) => `${name} Candle`,
    "candles",
    ["candles"],
    [img.candle],
    3600,
    95,
    "Scented candle with a slow, even burn.",
  ),
  ...line(
    "spray",
    (name) => `${name} Room Spray`,
    "room-spray",
    ["room-spray", "premium-spray", "luxury-spray"],
    [img.spray],
    4800,
    140,
    "Room spray for a quick lift in any space.",
  ),
];

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
  { slug: "car-diffusers", title: "Diffusers For Cars", image: "/collections/diffusers.png" },
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
      { href: "/collections/aroma-oils", label: "Aroma Oils for Diffusers" },
      { href: "/collections/car-cartridges", label: "Cartridge for Car Diffusers" },
      { href: "/collections/mino-oils", label: "MINO Oils" },
    ],
  },
  {
    label: "Scent Diffusers",
    href: "/collections/diffusers",
    children: [
      { href: "/collections/car-diffusers", label: "Car Diffusers" },
      { href: "/collections/diffusers", label: "Diffusers" },
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
      { href: "/collections/car-diffusers", label: "Car Diffusers" },
      { href: "/collections/diffusers", label: "Ecoscent Diffusers" },
      { href: "/collections/bundles", label: "Scent Trio Diffuser" },
      { href: "/collections/diffusers", label: "Plug In Diffusers" },
      { href: "/collections/diffusers", label: "Scent Splash Diffusers" },
    ],
  },
  {
    label: "Others",
    href: "/about",
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
