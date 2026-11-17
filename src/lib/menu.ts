import { withBase } from "@/lib/base";
import data from "./menu-data.json";

export type DishPhoto = { src: string; srcSet: string; thumb: string; width: number; height: number };
export type MenuItem = { no: number; name: string; sub?: string; size?: string; price: string; spice?: number; photo?: DishPhoto };
export type MenuCategory = { letter: string; title: string; vi: string; note?: { text: string; vi: string }; items: MenuItem[]; photo?: DishPhoto };
export type MenuSection = { id: string; roman: string; title: string; vi: string; categories: MenuCategory[] };
export type MenuEdition = { sections: MenuSection[]; footnote: string; pages: string[] };

// Photo files live in /public/menu/dishes as <name>-480.webp and <name>-1200.webp,
// all normalised to the same 4:3 frame (1200x900) on the site's navy background.
type PhotoDef = string;

// Photo for one dish, keyed by menu number.
const DISH_PHOTOS: Record<number, PhotoDef> = {
  1: "coca-cola",
  9: "orange-juice",
  17: "erdinger-weissbier",
  49: "breaded-prawns",
  53: "breaded-chicken",
  58: "chicken-drumsticks",
  59: "fries",
  63: "rice",
  66: "mushroom-sauce",
  76: "chicken-vegetables",
  80: "duck-vegetables",
  85: "duck-hoisin",
  87: "duck-yellow-curry",
  88: "prawns-sweet-sour",
  93: "crispy-fish",
  98: "squid-vegetables",
  99: "squid-stirfry",
  101: "beef-vegetables",
  111: "noodles-seafood",
  115: "fried-rice-beef",
  131: "beef-steak",
  135: "trout",
  136: "salmon",
  138: "duck-hot-pan",
  146: "breaded-prawns",
  147: "bun-bo-nam-bo",
  148: "bun-nem",
  151: "pho-stone-bowl",
  152: "crepe-raspberry",
  155: "fruit-platter",
};

// Photo shown at the top of a whole category, keyed by category letter.
const CATEGORY_PHOTOS: Record<string, PhotoDef> = {
  "D.": "wine-spirits",
  "E.": "coffee-tea",
  "F.": "vietnamese-drinks",
  "G.": "soups",
  "H.": "salads",
};

const toPhoto = (name: PhotoDef): DishPhoto => {
  const url = (w: number) => withBase(`/menu/dishes/${name}-${w}.webp`);
  return { src: url(1200), thumb: url(480), srcSet: `${url(480)} 480w, ${url(1200)} 1200w`, width: 1200, height: 900 };
};

const withPhotos = (ed: Omit<MenuEdition, "pages">): Omit<MenuEdition, "pages"> => ({
  ...ed,
  sections: ed.sections.map((s) => ({
    ...s,
    categories: s.categories.map((c) => {
      const cat = CATEGORY_PHOTOS[c.letter.trim()];
      return {
        ...c,
        ...(cat && { photo: toPhoto(cat) }),
        items: c.items.map((i) => (DISH_PHOTOS[i.no] ? { ...i, photo: toPhoto(DISH_PHOTOS[i.no]) } : i)),
      };
    }),
  })),
});

const pages = (k: string) => Array.from({ length: 12 }, (_, i) => withBase(`/menu/${k}-${String(i + 1).padStart(2, "0")}.webp`));

export const menus: Record<"de" | "cs", MenuEdition> = {
  de: { ...withPhotos(data.de as Omit<MenuEdition, "pages">), pages: pages("de") },
  cs: { ...withPhotos(data.cs as Omit<MenuEdition, "pages">), pages: pages("cs") },
};
