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

export const products: Product[] = [
  item("desk-mino", "Desk MINO Diffuser with 20ml Oil", 9900, img.mini, "diffusers", ["diffusers", "bundles"], "Compact desktop scent diffuser with a 20ml oil vial."),
  item("airmax-novo", "SKYDUST Airmax Novo Diffuser", 25371, img.euca, "diffusers", ["diffusers"], "Cold-air scent diffuser for homes and small offices."),
  item("airmax-plus", "SKYDUST Airmax Plus Machine", 27058, img.citrus, "diffusers", ["diffusers"], "Next-size automatic diffuser for open rooms."),
  item("scent-splash", "Scent Splash Diffuser Machine", 29812, img.night, "diffusers", ["diffusers", "bundles"], "Timed mist diffuser with a soft status glow."),
  item("sensei-plugin", "Sensei Aero Plug-in Diffuser", 18612, img.night, "diffusers", ["diffusers", "bundles"], "Wall plug-in diffuser for powder rooms and corridors."),
  item("car-diffuser", "Car Scent Diffuser (cartridge sold separate)", 12223, img.mini, "car-diffusers", ["diffusers", "car-diffusers", "bundles"], "Clip-in car diffuser. Pair with SKYDUST car cartridges."),
  item("ecoscent-smart", "Ecoscent Smart Scent Diffuser", 54965, img.lobby, "diffusers", ["diffusers", "bundles"], "App-ready unit for lobbies and larger rooms."),
  item("scent-trio", "Scent Trio Smart Diffusers for Home", 79499, img.kit, "bundles", ["diffusers", "bundles"], "Three-scent home set: machine plus two oils.", 89000),
  item("scent-pro-stand", "Scent Pro Stand", 13259, img.lobby, "diffusers", ["diffusers"], "Floor stand for SKYDUST commercial machines."),
  item("scent-box", "Scent Box Diffuser Machine", 116655, img.lobby, "diffusers", ["diffusers"], "Enclosed commercial box for mid-size venues."),
  item("hvac-scent", "HVAC Scent Machine for Large Spaces", 139986, img.lobby, "diffusers", ["diffusers"], "Ducted scenting for hotels, malls, and offices."),
  item("scentpro", "Scentpro Commercial Diffuser", 184357, img.lobby, "diffusers", ["diffusers"], "Flagship commercial machine for high-traffic floors."),
  item("airslim", "Airslim HVAC Diffuser", 202970, img.lobby, "diffusers", ["diffusers"], "Slim-profile HVAC diffuser for large commercial sites."),

  item("oil-aloe-green-tea", "Aloe Green Tea Oil 500ml", 5816, img.oil, "aroma-oils", ["aroma-oils", "hotel-oils"], "Green tea and aloe oil for electronic scent machines."),
  item("oil-bakarat", "Bakarat Oil 500ml", 7567, img.oil, "aroma-oils", ["aroma-oils", "hotel-oils"], "Warm amber oil used in hotel lobbies."),
  item("oil-bright", "Bright Oil 500ml", 6086, img.oil, "aroma-oils", ["aroma-oils"], "Citrus-forward oil for daytime spaces."),
  item("oil-cool-gentry", "Cool Gentry Oil 500ml", 6908, img.oil, "aroma-oils", ["aroma-oils", "hotel-oils"], "Clean musk and tea accord for offices."),
  item("oil-frangipani", "Elegant Frangipani Oil 500ml", 3502, img.oil, "aroma-oils", ["aroma-oils"], "Soft floral oil for suites and spas."),
  item("oil-aquatic", "Aquatic Breeze Oil 500ml", 5816, img.oil, "aroma-oils", ["aroma-oils", "hotel-oils"], "Marine freshness for washrooms and gyms."),
  item("oil-neutral-air", "Neutral Air Oil 500ml", 5400, img.oil, "aroma-oils", ["aroma-oils", "hotel-oils"], "Odor-neutralizing base oil."),
  item("oil-mocca", "Mocca Oil 500ml", 7200, img.oil, "aroma-oils", ["aroma-oils"], "Coffee-cocoa oil for cafés and lounges."),
  item("oil-black-jasmine", "Black Jasmine Oil 500ml", 7800, img.oil, "aroma-oils", ["aroma-oils", "hotel-oils"], "Night floral for evening scenting."),
  item("oil-linen", "Linen Air Cartridge", 3502, img.linen, "mino-oils", ["aroma-oils", "mino-oils"], "Snap-in cartridge for Desk MINO units."),
  item("oil-mino-citrus", "MINO Citrus Oil 20ml", 1900, img.linen, "mino-oils", ["aroma-oils", "mino-oils"], "Small-format citrus oil for desktop machines."),
  item("oil-mino-tea", "MINO Green Tea Oil 20ml", 1900, img.linen, "mino-oils", ["aroma-oils", "mino-oils"], "Small-format tea oil for desktop machines."),
  item("car-cartridge-citrus", "Car Cartridge — Citrus", 2800, img.linen, "car-cartridges", ["aroma-oils", "car-cartridges"], "Replacement cartridge for SKYDUST car diffusers."),
  item("car-cartridge-oud", "Car Cartridge — Oud", 3200, img.linen, "car-cartridges", ["aroma-oils", "car-cartridges"], "Oud cartridge for SKYDUST car diffusers."),
  item("seasonal-oil-trio", "Seasonal Oil Trio", 12400, img.trio, "aroma-oils", ["aroma-oils", "bundles"], "Mint, citrus, and blush oils for 90 days."),

  item("reeds-premium-150", "Premium Reeds 150ml", 4200, img.reeds, "premium-reeds", ["reeds", "premium-reeds"], "Small reed bottle for desks and powder rooms."),
  item("reeds-premium-250", "Premium Reeds 250ml", 5600, img.reeds, "premium-reeds", ["reeds", "premium-reeds"], "Mid reed bottle for living rooms."),
  item("reeds-luxury-500", "Luxury Reeds 500ml", 8900, img.reeds, "luxury-reeds-500", ["reeds", "luxury-reeds-500"], "Hotel-size reed diffuser."),
  item("reeds-luxury-1000", "Luxury Reeds 1000ml", 14900, img.reeds, "luxury-reeds-1000", ["reeds", "luxury-reeds-1000"], "Statement reed for lobbies."),
  item("reeds-luxury-2800", "Luxury Reeds 2800ml", 28900, img.reeds, "luxury-reeds-2800", ["reeds", "luxury-reeds-2800"], "Extra-large reed vessel for commercial floors."),
  item("reeds-premium-refill", "Premium Reeds Refill 500ml", 3900, img.oil, "premium-reeds-refill", ["reeds", "premium-reeds-refill"], "Refill oil for premium reed bottles."),
  item("reeds-luxury-refill", "Luxury Reeds Refill 1000ml", 7200, img.oil, "luxury-reeds-refill", ["reeds", "luxury-reeds-refill"], "Refill oil for luxury reed vessels."),

  item("spray-premium-500", "Premium Room Spray 500ml", 6100, img.spray, "premium-spray", ["room-spray", "premium-spray"], "Daily room spray in the SKYDUST scent family."),
  item("spray-luxury-500", "Luxury Room Spray 500ml", 7800, img.spray, "luxury-spray", ["room-spray", "luxury-spray"], "Longer-hold spray for suites and events."),

  item("candle-linen", "Scented Candle — Linen", 4200, img.candle, "candles", ["candles"], "Ceramic linen candle, clean burn."),
  item("candle-oud", "Scented Candle — Oud", 4800, img.candle, "candles", ["candles"], "Warm oud candle for evenings."),
  item("candle-citrus", "Scented Candle — Citrus", 4200, img.candle, "candles", ["candles"], "Bright citrus candle for daytime rooms."),
  item("candle-jasmine", "Scented Candle — Jasmine", 4500, img.candle, "candles", ["candles"], "Soft jasmine candle for bedrooms."),

  item("sample-set", "Scent Sample Set (6 vials)", 2500, img.trio, "samples", ["aroma-oils", "samples"], "Six 5ml vials to choose a signature scent."),
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

export const countries = [
  "UAE",
  "QATAR",
  "SAUDI ARABIA",
  "OMAN",
  "BAHRAIN",
  "KUWAIT",
  "UZBEKISTAN",
  "SWITZERLAND",
  "CANADA",
  "KAZAKHSTAN",
  "INDIA",
  "TANZANIA",
  "VIETNAM",
  "UNITED STATES OF AMERICA",
  "EGYPT",
  "JORDAN",
  "ITALY",
  "IVORY COAST",
  "IRAQ",
  "IRAN",
  "UK",
  "PAKISTAN",
  "FRANCE",
  "MALDIVES",
];

export function formatPrice(value: number) {
  return `Rs. ${value.toLocaleString("en-US")}.00`;
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
