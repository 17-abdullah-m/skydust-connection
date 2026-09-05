import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SiteHeader } from "../../components/SiteChrome";
import { parsePendingGoogleToken, pendingGoogleCookieName } from "@/lib/auth/oauth-state";
import { GoogleSignUpForm } from "./GoogleSignUpForm";

export default async function GoogleSignUpPage() {
  const store = await cookies();
  const token = store.get(pendingGoogleCookieName)?.value;
  const profile = token ? parsePendingGoogleToken(token) : null;
  if (!profile) redirect("/signup");

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
          {profile.inviteToken ? "Join your company" : "Finish with Google"}
        </h1>
        <p className="mt-2 text-center text-sm text-neutral-500">
          {profile.inviteToken
            ? "Confirm your Google account to join the team."
            : "Choose your company name to finish creating the account."}
        </p>
        <GoogleSignUpForm
          name={profile.name}
          email={profile.email}
          inviteToken={profile.inviteToken}
        />
      </main>
    </div>
  );
}
