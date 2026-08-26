"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "ar";

const copy = {
  en: {
    menu: "Menu",
    search: "Search",
    login: "Log in",
    cart: "Cart",
    shopCollections: "Shop By Collections",
    bestSellers: "Best sellers",
    viewAll: "View all",
    allProducts: "All products",
    about: "About Us",
    connect: "Connect Us",
    home: "Home",
    contact: "Contact Us",
    scentProfiles: "Scent Profiles",
    faqs: "FAQ's",
    terms: "Terms & Conditions",
    privacy: "Privacy Policy",
    refund: "Return & Refund Policy",
    quick: "Quick links",
    subscribe: "Subscribe to our emails",
    subscribeHint: "Be the first to know about new collections and exclusive offers.",
    email: "Email",
    subscribeBtn: "Subscribe",
    aboutBody:
      "SKYDUST is a scenting house for homes, hotels, and workplaces. Diffusers, aroma oils, reeds, sprays, and candles — one clean catalog.",
    footerNote: "SKYDUST · Oman & Pakistan",
    english: "English",
    arabic: "العربية",
    nav: {
      Clients: "Clients",
      "Aroma Oils": "Aroma Oils",
      "Scent Diffusers": "Scent Diffusers",
      "Reeds Diffusers": "Reeds Diffusers",
      "Scented Candles": "Scented Candles",
      "Room Spray": "Room Spray",
      "Bundle Offers": "Bundle Offers",
      Others: "Others",
      "Book An Appointment": "Book An Appointment",
    },
  },
  ar: {
    menu: "القائمة",
    search: "بحث",
    login: "تسجيل الدخول",
    cart: "السلة",
    shopCollections: "تسوق حسب المجموعات",
    bestSellers: "الأكثر مبيعاً",
    viewAll: "عرض الكل",
    allProducts: "كل المنتجات",
    about: "من نحن",
    connect: "تواصل معنا",
    home: "الرئيسية",
    contact: "اتصل بنا",
    scentProfiles: "ملفات العطور",
    faqs: "الأسئلة الشائعة",
    terms: "الشروط والأحكام",
    privacy: "سياسة الخصوصية",
    refund: "سياسة الإرجاع والاسترداد",
    quick: "روابط سريعة",
    subscribe: "اشترك في رسائلنا",
    subscribeHint: "كن أول من يعرف عن المجموعات الجديدة والعروض.",
    email: "البريد الإلكتروني",
    subscribeBtn: "اشترك",
    aboutBody:
      "سكايدست بيت للعطور للمنازل والفنادق وأماكن العمل. أجهزة نشر، زيوت عطرية، أعواد، بخاخات وشموع — كتالوج واحد نظيف.",
    footerNote: "سكايدست · عُمان وباكستان",
    english: "English",
    arabic: "العربية",
    nav: {
      Clients: "العملاء",
      "Aroma Oils": "الزيوت العطرية",
      "Scent Diffusers": "أجهزة العطر",
      "Reeds Diffusers": "أعواد العطر",
      "Scented Candles": "الشموع المعطرة",
      "Room Spray": "بخاخ الغرف",
      "Bundle Offers": "عروض الباقات",
      Others: "أخرى",
      "Book An Appointment": "احجز موعداً",
    },
  },
} as const;

type Copy = (typeof copy)["en"];

const LanguageContext = createContext<{
  lang: Lang;
  dir: "ltr" | "rtl";
  t: Copy;
  setLang: (lang: Lang) => void;
} | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("skydust-lang");
    if (saved === "ar" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    window.localStorage.setItem("skydust-lang", lang);
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      dir: (lang === "ar" ? "rtl" : "ltr") as "ltr" | "rtl",
      t: copy[lang],
      setLang: (next: Lang) => setLangState(next),
    }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
