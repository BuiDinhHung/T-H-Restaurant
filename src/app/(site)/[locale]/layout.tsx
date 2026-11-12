import { withBase } from "@/lib/base";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../../globals.css";
import { fontVars } from "../../fonts";
import { LOCALES, getDict, isLocale, localeConfig } from "@/lib/i18n";
import { alternates } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => LOCALES.map((locale) => ({ locale }));

export const viewport: Viewport = { themeColor: "#060a22", width: "device-width", initialScale: 1 };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDict(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: d.meta.title,
    description: d.meta.description,
    alternates: alternates(locale),
    icons: { icon: withBase("/favicon.png"), apple: withBase("/apple-icon.png") },
    other: { google: "notranslate" },
    openGraph: {
      type: "website",
      siteName: "T&H Restaurant New Asian",
      title: d.meta.title,
      description: d.meta.description,
      locale: localeConfig[locale].hreflang.replace("-", "_"),
      url: `/${locale}/`,
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "T&H Restaurant New Asian" }],
    },
    twitter: { card: "summary_large_image", title: d.meta.title, description: d.meta.description, images: ["/og.jpg"] },
  };
}

export default async function SiteLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={localeConfig[locale].lang} translate="no" className={`notranslate ${fontVars}`}>
      <body className="notranslate" translate="no">{children}</body>
    </html>
  );
}
