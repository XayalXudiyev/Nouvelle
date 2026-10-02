import { Cormorant_Garamond, Onest } from "next/font/google";

// Hər iki şrift Azərbaycan (ə), kiril və latın hərflərini dəstəkləyir.
export const display = Cormorant_Garamond({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const sans = Onest({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  variable: "--font-onest",
  display: "swap",
});
