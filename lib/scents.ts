export type ScentId = "midnight-oud" | "velvet-rose" | "white-musk" | "arabian-amber";
export type MoodId = "relaxed" | "luxurious" | "fresh" | "mysterious";

export type Scent = {
  id: ScentId;
  mood: MoodId;
  image: string;
  nameKey: "midnightOud" | "velvetRose" | "whiteMusk" | "arabianAmber";
  moodKey: "midnightMood" | "velvetMood" | "whiteMood" | "arabianMood";
  href: string;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
};

export const scents: Scent[] = [
  {
    id: "midnight-oud",
    mood: "mysterious",
    image: "/luxury/scent-midnight-oud.png",
    nameKey: "midnightOud",
    moodKey: "midnightMood",
    href: "/collections/aroma-oils",
    notes: {
      top: ["Saffron", "Bergamot", "Pink pepper"],
      heart: ["Oud", "Damask rose", "Incense"],
      base: ["Amber", "Patchouli", "Leather"],
    },
  },
  {
    id: "velvet-rose",
    mood: "relaxed",
    image: "/luxury/scent-velvet-rose.png",
    nameKey: "velvetRose",
    moodKey: "velvetMood",
    href: "/collections/aroma-oils",
    notes: {
      top: ["Lychee", "Peony", "Bergamot"],
      heart: ["Velvet rose", "Jasmine", "Violet"],
      base: ["Musk", "Cedar", "Vanilla"],
    },
  },
  {
    id: "white-musk",
    mood: "fresh",
    image: "/luxury/scent-white-musk.png",
    nameKey: "whiteMusk",
    moodKey: "whiteMood",
    href: "/collections/aroma-oils",
    notes: {
      top: ["Neroli", "Green tea", "Lemon zest"],
      heart: ["White musk", "Lily", "Freesia"],
      base: ["Sandalwood", "Soft woods", "Clean musk"],
    },
  },
  {
    id: "arabian-amber",
    mood: "luxurious",
    image: "/luxury/scent-arabian-amber.png",
    nameKey: "arabianAmber",
    moodKey: "arabianMood",
    href: "/collections/aroma-oils",
    notes: {
      top: ["Cardamom", "Orange blossom", "Warm spice"],
      heart: ["Arabian amber", "Labdanum", "Honey"],
      base: ["Oud", "Vanilla", "Tonka"],
    },
  },
];

export const moods: MoodId[] = ["relaxed", "luxurious", "fresh", "mysterious"];

export const WHATSAPP_HREF = "https://wa.me/96879007353";
export const INSTAGRAM_HREF = "https://www.instagram.com/";
