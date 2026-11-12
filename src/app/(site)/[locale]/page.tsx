import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Food from "@/components/Food";
import MenuSection from "@/components/MenuSection";
import Gallery from "@/components/Gallery";
import Visit from "@/components/Visit";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";
import RevealObserver from "@/components/RevealObserver";
import { getDict, isLocale } from "@/lib/i18n";
import { restaurantJsonLd } from "@/lib/seo";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDict(locale);
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:rounded-full focus:bg-gold-400 focus:px-4 focus:py-2 focus:text-navy-950">
        Skip to content
      </a>
      <Header locale={locale} dict={dict} />
      <main id="main">
        <Hero dict={dict} />
        <About dict={dict} />
        <Food dict={dict} />
        <MenuSection locale={locale} dict={dict} />
        <Gallery dict={dict} />
        <Visit dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
      <MobileBar dict={dict} />
      <RevealObserver />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd(locale)) }} />
    </>
  );
}
