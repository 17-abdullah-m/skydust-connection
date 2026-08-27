import { SiteHeader } from "../components/SiteChrome";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-white text-neutral-900">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-5 py-16">
        <LoginForm />
      </main>
    </div>
  );
}
