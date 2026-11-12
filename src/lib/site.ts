/**
 * Business facts. Everything here comes from material supplied by the owner
 * (business card, menus, Google Maps link). Do not add facts that are not confirmed.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const business = {
  name: "T&H Restaurant New Asian",
  address: {
    line1: "Restaurant Horní Folmava 8",
    street: "Horní Folmava 8",
    postalCode: "345 32",
    city: "Česká Kubice",
    countryCode: "CZ",
  },
  phones: [
    { display: "+420 728 599 999", href: "tel:+420728599999", messengers: "WhatsApp · Viber · Facebook · Zalo" },
    { display: "+420 792 399 924", href: "tel:+420792399924" },
  ],
  whatsapp: "https://wa.me/420728599999",
  facebookName: "T&H Restaurant New Asian",
  hours: { open: "10:00", close: "22:00", kitchenOpen: "10:00", kitchenClose: "20:00" },
  maps: {
    share: "https://maps.app.goo.gl/fwAaenmzpH5JiiBUA",
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=" +
      encodeURIComponent("T&H Restaurant, Horní Folmava 8, 345 32 Česká Kubice"),
    embed:
      "https://www.google.com/maps?q=" +
      encodeURIComponent("Horní Folmava 8, 345 32 Česká Kubice") +
      "&z=15&output=embed",
  },
} as const;
