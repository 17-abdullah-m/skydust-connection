import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "./SiteChrome";

export function StorePage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-white text-neutral-900">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-14 md:px-8">
        <h1 className="text-center text-3xl font-medium">{title}</h1>
        <div className="mt-10 space-y-5 text-sm leading-7 text-neutral-700">{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}
