import type { MetadataRoute } from "next";
import { LOCALES, localeConfig } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(LOCALES.map((l) => [localeConfig[l].hreflang, `${SITE_URL}/${l}/`]));
  return [
    ...LOCALES.map((l) => ({ url: `${SITE_URL}/${l}/`, changeFrequency: "monthly" as const, priority: 1, alternates: { languages } })),
  ];
}
