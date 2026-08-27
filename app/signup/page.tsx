import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteHeader } from "../components/SiteChrome";
import { prisma } from "@/lib/db";
import { SignUpForm } from "./SignUpForm";

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ invite?: string }>;
}) {
  const { invite } = await searchParams;
  let inviteEmail: string | undefined;
  if (invite) {
    const row = await prisma.invite.findUnique({ where: { token: invite } });
    if (!row || row.expiresAt < new Date()) notFound();
    inviteEmail = row.email;
  }

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
        <h1 className="mt-8 text-center text-2xl font-medium">
          {invite ? "Join your company" : "Create your company"}
        </h1>
        <p className="mt-2 text-center text-sm text-neutral-500">
          {invite
            ? "Finish your invite to access the company dashboard."
            : "Name, email, password, and company — you become the admin."}
        </p>
        <SignUpForm inviteToken={invite} inviteEmail={inviteEmail} />
      </main>
    </div>
  );
}
