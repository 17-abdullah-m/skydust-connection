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

export function HeaderAccount({ layout = "bar" }: { layout?: "bar" | "menu" }) {
  const { t } = useLang();
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null | undefined>(undefined);
  const itemClass =
    layout === "menu" ? "block py-1 hover:opacity-60" : "hidden hover:opacity-60 sm:inline";

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
    return layout === "bar" ? <span className="hidden w-16 sm:inline" /> : null;
  }

  if (!user) {
    return (
      <>
        <Link href="/login" className={itemClass}>
          {t.login}
        </Link>
        <Link href="/signup" className={itemClass}>
          {t.signup}
        </Link>
      </>
    );
  }

  return (
    <>
      <Link href="/dashboard" className={itemClass}>
        {t.dashboard}
      </Link>
      <button type="button" onClick={logout} className={itemClass}>
        {t.logout}
      </button>
    </>
  );
}
