import Image from "next/image";
import Link from "next/link";

export function CollectionHub({
  items,
}: {
  items: { href: string; label: string; image: string }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="group block">
          <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
            <Image
              src={item.image}
              alt={item.label}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-700 ease-out group-hover:scale-110"
            />
          </div>
          <p className="mt-4 text-center text-sm tracking-[0.12em] uppercase">{item.label}</p>
        </Link>
      ))}
    </div>
  );
}
