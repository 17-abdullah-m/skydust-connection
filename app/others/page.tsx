import { CollectionHub } from "../components/CollectionHub";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";

const items = [
  { href: "/about", label: "About Us", image: "/collections/oils.png" },
  { href: "/videos", label: "Video Tutorials", image: "/collections/diffusers.png" },
  { href: "/contact", label: "Contact Us", image: "/collections/reeds.png" },
];

export default function OthersPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-white text-neutral-900">
      <SiteHeader />
      <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-12 md:px-8">
        <h1 className="text-center text-3xl font-medium">Others</h1>
        <p className="mt-2 text-center text-sm text-neutral-500">{items.length} pages</p>
        <div className="mt-12">
          <CollectionHub items={items} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
