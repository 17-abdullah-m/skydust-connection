import Image from "next/image";
import { Suspense } from "react";
import { SiteHeader } from "../components/SiteChrome";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-white text-neutral-900">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-5 py-16">
        <Image
          src="/skydust-wordmark.png"
          alt="SKYDUST"
          width={411}
          height={70}
          unoptimized
          className="mx-auto h-8 w-auto"
          style={{ width: "auto", height: 32 }}
        />
        <h1 className="mt-8 text-center text-2xl font-medium">Log in</h1>
        <p className="mt-2 text-center text-sm text-neutral-500">
          Access your company dashboard.
        </p>
        <Suspense fallback={<p className="mt-8 text-center text-sm text-neutral-400">Loading…</p>}>
          <LoginForm />
        </Suspense>
      </main>
    </div>
  );
}
