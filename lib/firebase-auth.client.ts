"use client";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  type Auth,
  type UserCredential,
} from "firebase/auth";
import { getFirebaseApp, isFirebaseConfigured } from "./firebase.client";

export function getFirebaseAuth(): Auth {
  const app = getFirebaseApp();
  return getAuth(app);
}

export function formatFirebaseAuthError(error: unknown): string {
  if (typeof error === "object" && error !== null && "code" in error) {
    const code = String((error as { code: unknown }).code);
    switch (code) {
      case "auth/popup-closed-by-user":
        return "Sign-in popup was closed before completing.";
      case "auth/popup-blocked":
        return "Sign-in popup was blocked by your browser. Please allow popups for localhost.";
      case "auth/unauthorized-domain":
        return "This domain (localhost) is not authorized in Firebase Console. Please add localhost under Firebase Authentication -> Settings -> Authorized domains.";
      case "auth/operation-not-allowed":
        return "Google sign-in is not enabled in Firebase Authentication. Enable Google provider in the Firebase Console.";
      case "auth/cancelled-popup-request":
        return "Sign-in was cancelled by another request.";
      case "auth/network-request-failed":
        return "Network connection failed. Please check your internet connection.";
      case "auth/account-exists-with-different-credential":
        return "An account already exists with the same email using a different sign-in method.";
      default:
        if ("message" in error && typeof (error as { message: unknown }).message === "string") {
          return (error as { message: string }).message;
        }
    }
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Google authentication failed. Please try again.";
}

export async function signInWithGooglePopup(): Promise<UserCredential> {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase Authentication is not configured. Missing NEXT_PUBLIC_FIREBASE_* settings.");
  }
  const auth = getFirebaseAuth();
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  return await signInWithPopup(auth, provider);
}

export async function firebaseSignOutClient(): Promise<void> {
  try {
    const auth = getFirebaseAuth();
    if (auth.currentUser) {
      await signOut(auth);
    }
  } catch {
    // Ignore sign-out error on client
  }
}
