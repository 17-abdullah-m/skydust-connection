export type Product = {
  slug: string;
  title: string;
  price: number;
  compareAt?: number;
  image: string;
  category: string;
  blurb: string;
};

export const products: Product[] = [
  {
    slug: "eucalyptus-mist-diffuser",
    title: "Eucalyptus Mist Diffuser",
    price: 89,
    image: "/products/product-eucalyptus-diffuser.png",
    category: "Diffusers",
    blurb: "Matte white automatic diffuser with a cool eucalyptus mist.",
  },
  {
    slug: "citrus-grove-diffuser",
    title: "Citrus Grove Diffuser",
    price: 89,
    image: "/products/product-citrus-diffuser.png",
    category: "Diffusers",
    blurb: "Bright lemon-orange scent for kitchens, lobbies, and desks.",
  },
  {
    slug: "mini-desk-diffuser",
    title: "Mini Desk Diffuser",
    price: 59,
    image: "/products/product-mini-desk.png",
    category: "Diffusers",
    blurb: "Compact pebble diffuser for a single workstation.",
  },
  {
    slug: "lobby-pro-diffuser",
    title: "Lobby Pro Diffuser",
    price: 149,
    image: "/products/product-lobby-pro.png",
    category: "Diffusers",
    blurb: "Tall commercial unit for reception and open floors.",
  },
  {
    slug: "night-bloom-diffuser",
    title: "Night Bloom Diffuser",
    price: 94,
    image: "/products/product-night-bloom.png",
    category: "Diffusers",
    blurb: "Soft dusk-pink glow and a quiet evening floral mist.",
  },
  {
    slug: "auto-refill-starter-kit",
    title: "Auto Refill Starter Kit",
    price: 129,
    compareAt: 158,
    image: "/products/product-starter-kit.png",
    category: "Bundles",
    blurb: "One diffuser plus two cartridges. Subscription-ready.",
  },
  {
    slug: "seasonal-refill-trio",
    title: "Seasonal Refill Trio",
    price: 34,
    image: "/products/product-refill-trio.png",
    category: "Refills",
    blurb: "Mint, citrus, and blush cartridges for the next 90 days.",
  },
  {
    slug: "linen-air-cartridge",
    title: "Linen Air Cartridge",
    price: 24,
    image: "/products/product-linen-cartridge.png",
    category: "Refills",
    blurb: "Clean cotton-linen refill. Snaps into any SKYDUST unit.",
  },
];

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function getProduct(slug: string) {
  return products.find((item) => item.slug === slug);
}
