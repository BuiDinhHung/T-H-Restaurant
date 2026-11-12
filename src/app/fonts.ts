import { Be_Vietnam_Pro, Cinzel, Cormorant_Garamond } from "next/font/google";

export const display = Cormorant_Garamond({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const sans = Be_Vietnam_Pro({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600"],
  variable: "--font-bevietnam",
  display: "swap",
});

export const brand = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

export const fontVars = `${display.variable} ${sans.variable} ${brand.variable}`;
