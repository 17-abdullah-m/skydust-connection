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
    luxury: {
      skipIntro: "Skip",
      introLine1: "A SPACE HAS A FEELING.",
      introLine2: "GIVE IT A SCENT.",
      introCraft: "20 YEARS OF FRAGRANCE CRAFTSMANSHIP",
      exploreCollection: "EXPLORE THE COLLECTION",
      heroEyebrow: "SKYDUST",
      heroTitle: "A signature scent for every space.",
      heroBody:
        "Luxury automatic fragrance — crafted for homes, cars, offices and hotels across Oman and Pakistan.",
      yearsTitle: "20 Years. One Signature.",
      yearsBody:
        "For two decades, we’ve been turning ordinary spaces into memorable experiences.",
      scentCollectionTitle: "Scent Collection",
      scentCollectionHint: "Four signatures. Four moods.",
      midnightOud: "Midnight Oud",
      midnightMood: "Mysterious · Deep · After dark",
      velvetRose: "Velvet Rose",
      velvetMood: "Soft · Intimate · Relaxed",
      whiteMusk: "White Musk",
      whiteMood: "Clean · Airy · Fresh",
      arabianAmber: "Arabian Amber",
      arabianMood: "Warm · Golden · Luxurious",
      selectorTitle: "What should your space feel like?",
      moodRelaxed: "Relaxed",
      moodLuxurious: "Luxurious",
      moodFresh: "Fresh",
      moodMysterious: "Mysterious",
      beforeAfterKicker: "Atmosphere",
      beforeAfterTitle: "The room, rewritten",
      beforeLabel: "Before",
      afterLabel: "After",
      notesTitle: "Scent Notes",
      topNotes: "Top Notes",
      heartNotes: "Heart Notes",
      baseNotes: "Base Notes",
      bottleKicker: "The bottle",
      bottleTitle: "Crafted to linger",
      bottleBody:
        "A bottle designed for presence — quiet on the shelf, unforgettable in the air.",
      spacesTitle: "Made for Spaces That Matter",
      spaceHomes: "Homes",
      spaceHomesBody: "Living rooms, suites and private corridors.",
      spaceCars: "Cars",
      spaceCarsBody: "A signature trail for every journey.",
      spaceOffices: "Offices",
      spaceOfficesBody: "Calm focus for rooms that work.",
      spaceHotels: "Hotels",
      spaceHotelsBody: "Lobbies and guest floors that feel remembered.",
      reviewsTitle: "In the air",
      reviewsHint: "Sample notes — illustrative only, until customer reviews are published.",
      statYears: "20+ Years",
      statCustomers: "50K+ Customers",
      statRating: "4.9/5 Rating",
      statLasting: "Long-Lasting Fragrance",
      ctaKicker: "Your space is waiting",
      cta: "Find Your Signature Scent →",
      instagram: "Instagram",
      whatsapp: "WhatsApp",
      fragranceCollection: "Fragrance Collection",
      follow: "Follow",
    },
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
    luxury: {
      skipIntro: "تخطي",
      introLine1: "لِلْمَكَانِ شُعُورٌ.",
      introLine2: "فَامْنَحْهُ عِطْراً.",
      introCraft: "عشرون عاماً من صناعة العطور",
      exploreCollection: "استكشف المجموعة",
      heroEyebrow: "سكايدست",
      heroTitle: "عطر توقيع لكل مكان.",
      heroBody:
        "عطور فاخرة أوتوماتيكية — مصممة للمنازل والسيارات والمكاتب والفنادق في عُمان وباكستان.",
      yearsTitle: "عشرون عاماً. توقيع واحد.",
      yearsBody: "منذ عقدين ونحن نحوّل الأماكن العادية إلى تجارب تُحفظ في الذاكرة.",
      scentCollectionTitle: "مجموعة العطور",
      scentCollectionHint: "أربعة تواقيع. أربعة أمزجة.",
      midnightOud: "عود منتصف الليل",
      midnightMood: "غامض · عميق · بعد الغروب",
      velvetRose: "ورد مخملي",
      velvetMood: "ناعم · حميمي · هادئ",
      whiteMusk: "مسك أبيض",
      whiteMood: "نقي · هوائي · منعش",
      arabianAmber: "عنبر عربي",
      arabianMood: "دافئ · ذهبي · فاخر",
      selectorTitle: "كيف تريد أن يشعر مكانك؟",
      moodRelaxed: "هادئ",
      moodLuxurious: "فاخر",
      moodFresh: "منعش",
      moodMysterious: "غامض",
      beforeAfterKicker: "الأجواء",
      beforeAfterTitle: "الغرفة، بعد إعادة كتابتها",
      beforeLabel: "قبل",
      afterLabel: "بعد",
      notesTitle: "نوتات العطر",
      topNotes: "النوتات العليا",
      heartNotes: "نوتات القلب",
      baseNotes: "النوتات الأساسية",
      bottleKicker: "الزجاجة",
      bottleTitle: "صُنعت لتبقى",
      bottleBody: "زجاجة بهدوء على الرف، وحضور لا يُنسى في الهواء.",
      spacesTitle: "صُنعت لأماكن تستحق",
      spaceHomes: "المنازل",
      spaceHomesBody: "غرف المعيشة والأجنحة والممرات الخاصة.",
      spaceCars: "السيارات",
      spaceCarsBody: "أثر عطري يرافق كل رحلة.",
      spaceOffices: "المكاتب",
      spaceOfficesBody: "هدوء وتركيز للمساحات العملية.",
      spaceHotels: "الفنادق",
      spaceHotelsBody: "بهو وطوابق تُتذكر بعد المغادرة.",
      reviewsTitle: "في الهواء",
      reviewsHint: "نصوص تجريبية — للعرض فقط، إلى حين نشر تقييمات العملاء.",
      statYears: "+٢٠ عاماً",
      statCustomers: "+٥٠ ألف عميل",
      statRating: "تقييم ٤٫٩/٥",
      statLasting: "عطر يدوم طويلاً",
      ctaKicker: "مكانك ينتظر",
      cta: "اعثر على عطرك التوقيع ←",
      instagram: "إنستغرام",
      whatsapp: "واتساب",
      fragranceCollection: "مجموعة العطور",
      follow: "تابعنا",
    },
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
      t: copy[lang] as Copy,
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
