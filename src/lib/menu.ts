/**
 * Full menus, transcribed 1:1 from the printed PDFs
 * ("BẢN CHUẨN ĐỨC - VIỆT T&H ruột menu a4.pdf" and "SÉC - VIỆT T&H ruột menu a4.pdf").
 * Data lives in menu-data.json. Names, Vietnamese lines and prices are exactly as printed;
 * edit the JSON when the printed menu changes.
 */
import { withBase } from "@/lib/base";
import data from "./menu-data.json";

export type MenuItem = { no: number; name: string; sub?: string; size?: string; price: string; spice?: number };
export type MenuCategory = { letter: string; title: string; vi: string; note?: { text: string; vi: string }; items: MenuItem[] };
export type MenuSection = { id: string; roman: string; title: string; vi: string; categories: MenuCategory[] };
export type MenuEdition = { sections: MenuSection[]; footnote: string; pages: string[] };

const pages = (k: string) => Array.from({ length: 12 }, (_, i) => withBase(`/menu/${k}-${String(i + 1).padStart(2, "0")}.webp`));

export const menus: Record<"de" | "cs", MenuEdition> = {
  de: { ...(data.de as Omit<MenuEdition, "pages">), pages: pages("de") },
  cs: { ...(data.cs as Omit<MenuEdition, "pages">), pages: pages("cs") },
};
