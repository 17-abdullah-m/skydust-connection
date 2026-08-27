"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { placeOrderAction } from "@/app/actions/orders";
import { useCart } from "./CartProvider";

export function CheckoutButton() {
  const { lines, clear } = useCart();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function checkout() {
    setError(null);
    setPending(true);
    const session = await fetch("/api/session").then((res) => res.json());
    if (!session.user) {
      router.push("/login?next=/cart");
      return;
    }
    const result = await placeOrderAction(lines.map((line) => ({ slug: line.slug, qty: line.qty })));
    setPending(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    clear();
    router.push("/dashboard/orders");
    router.refresh();
  }

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={checkout}
        disabled={pending}
        className="flex w-full items-center justify-center rounded-full bg-[#111] px-4 py-3 text-sm font-medium text-white hover:bg-[#333] disabled:opacity-50"
      >
        {pending ? "Placing order…" : "Place order"}
      </button>
      {error ? (
        <p className="mt-3 text-center text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : (
        <p className="mt-3 text-center text-xs text-neutral-500">
          Orders are saved to your company account. Sign in first if you have not.
        </p>
      )}
    </div>
  );
}
