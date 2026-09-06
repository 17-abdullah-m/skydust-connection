"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithGooglePopup, formatFirebaseAuthError } from "@/lib/firebase-auth.client";
import { syncFirebaseGoogleSessionAction } from "@/app/actions/auth";

type GoogleSignInButtonProps = {
  mode: "login" | "signup";
  next?: string;
  inviteToken?: string;
  label?: string;
  onError?: (error: string | null) => void;
};

export function GoogleSignInButton({
  mode,
  next,
  inviteToken,
  label = mode === "signup" ? "Sign up with Google" : "Sign in with Google",
  onError,
}: GoogleSignInButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  async function handleGoogleClick() {
    setLoading(true);
    setLocalError(null);
    onError?.(null);

    try {
      const credential = await signInWithGooglePopup();
      const idToken = await credential.user.getIdToken();

      const result = await syncFirebaseGoogleSessionAction({
        idToken,
        inviteToken,
        next,
      });

      if (!result.ok) {
        setLocalError(result.error);
        onError?.(result.error);
        setLoading(false);
        return;
      }

      router.push(result.redirectTo);
      router.refresh();
    } catch (err: unknown) {
      console.error("Google authentication error:", err);
      const message = formatFirebaseAuthError(err);
      setLocalError(message);
      onError?.(message);
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleGoogleClick}
        disabled={loading}
        className="flex w-full items-center justify-center gap-3 border border-neutral-300 bg-white py-3 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <GoogleMark />
        {loading ? "Connecting to Google…" : label}
      </button>
      {localError && !onError ? (
        <p className="text-sm text-red-600" role="alert">
          {localError}
        </p>
      ) : null}
    </div>
  );
}

export function GoogleSignUpButton({
  next,
  inviteToken,
  label,
  onError,
}: Omit<GoogleSignInButtonProps, "mode">) {
  return (
    <GoogleSignInButton
      mode="signup"
      next={next}
      inviteToken={inviteToken}
      label={label || (inviteToken ? "Join with Google" : "Sign up with Google")}
      onError={onError}
    />
  );
}

function GoogleMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export function AuthDivider() {
  return (
    <div className="relative py-1">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-neutral-200" />
      </div>
      <div className="relative flex justify-center text-xs uppercase tracking-wide">
        <span className="bg-white px-3 text-neutral-400">or</span>
      </div>
    </div>
  );
}
