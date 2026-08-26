import type { Metadata } from "next";
import { Cairo, Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "./components/CartProvider";
import { LanguageProvider } from "./components/LanguageProvider";
import { WhatsAppButton } from "./components/WhatsAppButton";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const arabic = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700"],
});

const display = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SKYDUST Pakistan | Scent Diffuser | Home Fragrance",
  description:
    "SKYDUST scent diffusers, aroma oils, reed diffusers, room sprays and candles. Clean fragrance for home and hospitality.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable} ${arabic.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#111]">
        <LanguageProvider>
          <CartProvider>
            {children}
            <WhatsAppButton />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
