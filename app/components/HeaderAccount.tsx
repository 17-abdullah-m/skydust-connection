"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLang } from "./LanguageProvider";

type SessionUser = {
  name: string;
  email: string;
  companyName: string;
  role: string;
};

export function HeaderAccount() {
  const { t } = useLang();
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/session")
      .then((res) => res.json())
      .then((data: { user: SessionUser | null }) => {
        if (!cancelled) setUser(data.user);
      })
      .catch(() => {
        if (!cancelled) setUser(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/login");
    router.refresh();
  }

  if (user === undefined) {
    return <span className="hidden w-16 sm:inline" />;
  }

  if (!user) {
    return (
      <>
        <Link href="/login" className="hidden hover:opacity-60 sm:inline">
          {t.login}
        </Link>
        <Link href="/signup" className="hidden hover:opacity-60 sm:inline">
          {t.signup}
        </Link>
      </>
    );
  }

  return (
    <>
      <Link href="/dashboard" className="hidden hover:opacity-60 sm:inline">
        {t.dashboard}
      </Link>
      <button type="button" onClick={logout} className="hidden hover:opacity-60 sm:inline">
        {t.logout}
      </button>
    </>
  );
}
