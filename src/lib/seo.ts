import { business, SITE_URL } from "./site";
import { LOCALES, localeConfig, type LocaleKey } from "./i18n";

export const alternates = (current?: LocaleKey) => ({
  canonical: current ? `/${current}/` : "/",
  languages: {
    ...Object.fromEntries(LOCALES.map((l) => [localeConfig[l].hreflang, `/${l}/`])),
    "x-default": "/de/",
  },
});

export const restaurantJsonLd = (locale: LocaleKey) => ({
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: business.name,
  url: `${SITE_URL}/${locale}/`,
  image: [`${SITE_URL}/og.jpg`, `${SITE_URL}/media/terrace-view-1536.webp`],
  logo: `${SITE_URL}/logo.png`,
  telephone: business.phones[0].href.replace("tel:", ""),
  servesCuisine: "Asian",
  hasMenu: `${SITE_URL}/${locale}/#menu`,
  hasMap: business.maps.share,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.street,
    postalCode: business.address.postalCode,
    addressLocality: business.address.city,
    addressCountry: business.address.countryCode,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: business.hours.open,
      closes: business.hours.close,
    },
  ],
});
