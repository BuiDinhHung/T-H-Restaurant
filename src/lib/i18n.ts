export const LOCALES = ["de", "cz"] as const;
export type LocaleKey = (typeof LOCALES)[number];

export const localeConfig: Record<LocaleKey, { lang: "de" | "cs"; menu: "de" | "cs"; hreflang: string; short: string; label: string }> = {
  de: { lang: "de", menu: "de", hreflang: "de", short: "DE", label: "Deutsch" },
  cz: { lang: "cs", menu: "cs", hreflang: "cs", short: "CZ", label: "Čeština" },
};

export const isLocale = (v: string): v is LocaleKey => (LOCALES as readonly string[]).includes(v);

export type Dict = {
  meta: { title: string; description: string };
  nav: { home: string; menu: string; restaurant: string; gallery: string; contact: string; openMenu: string; close: string; switchTo: string };
  hero: { eyebrow: string; lead: string; ctaMenu: string; ctaFind: string; openDaily: string };
  about: { eyebrow: string; title: string; p1: string; p2: string; facts: [string, string][] };
  food: { eyebrow: string; title: string; text: string; captions: [string, string, string, string]; toMenu: string };
  menu: {
    eyebrow: string;
    title: string;
    edition: string;
    currency: string;
    search: string;
    all: string;
    results: string;
    empty: string;
    original: string;
    spicy: string;
    count: string;
  };
  gallery: { eyebrow: string; title: string; text: string; video: string; open: string; more: string; filters: { all: string; kitchen: string; inside: string; terrace: string } };
  visit: {
    eyebrow: string;
    title: string;
    country: string;
    border: string;
    openMaps: string;
    directions: string;
    mapConsent: string;
    mapLoad: string;
    hoursTitle: string;
    days: string;
    daysShort: string;
    kitchen: string;
    daily: string;
    contactTitle: string;
    call: string;
  };
  footer: { about: string; explore: string; visit: string; language: string; rights: string };
  mobile: { call: string; menu: string; route: string };
  alt: Record<string, string>;
};

const de: Dict = {
  meta: {
    title: "T&H Restaurant New Asian – Asiatisches Restaurant an der Grenze bei Furth im Wald",
    description:
      "T&H Restaurant New Asian in Horní Folmava (Česká Kubice), direkt an der deutsch-tschechischen Grenze. Täglich geöffnet 10–22 Uhr. Komplette Speisekarte mit Preisen in Euro.",
  },
  nav: { home: "Start", menu: "Speisekarte", restaurant: "Restaurant", gallery: "Galerie", contact: "Kontakt", openMenu: "Menü öffnen", close: "Schließen", switchTo: "Sprache wechseln" },
  hero: {
    eyebrow: "Asiatische Küche · Horní Folmava",
    lead: "Asiatische Küche, frisch zubereitet – in der holzgetäfelten Gaststube oder auf der Terrasse mit Blick ins Grüne. Direkt an der deutsch-tschechischen Grenze, sieben Tage die Woche.",
    ctaMenu: "Speisekarte entdecken",
    ctaFind: "Restaurant finden",
    openDaily: "Täglich geöffnet",
  },
  about: {
    eyebrow: "Das Restaurant",
    title: "Ein Ort zum Ankommen.",
    p1: "Zwischen Bayerischem Wald und Böhmerwald, direkt am Grenzübergang Folmava, empfängt T&H Restaurant New Asian Gäste aus Deutschland und Tschechien. Auf der Karte stehen asiatische und vietnamesische Gerichte ebenso wie europäische Klassiker.",
    p2: "Drinnen erwartet Sie eine warme Gaststube mit Holzvertäfelung, draußen eine weitläufige Terrasse unter großen Sonnenschirmen – für ein Mittagessen mit der Familie, eine Pause auf der Durchreise oder einen Abend mit Freunden.",
    facts: [["7/7", "Täglich geöffnet"], ["155", "Gerichte & Getränke"], ["Terrasse", "Mit Blick ins Grüne"]],
  },
  food: {
    eyebrow: "Aus unserer Küche",
    title: "Heiß serviert. Mit Sorgfalt angerichtet.",
    text: "Ein Blick in unsere Küche – so kommen die Gerichte bei uns auf den Tisch.",
    captions: ["Asiatische Hauptgerichte", "Heiße Pfanne", "Europäische Hauptgerichte", "Vorspeisen"],
    toMenu: "Zur Speisekarte",
  },
  menu: {
    eyebrow: "Speisekarte",
    title: "Unsere Karte",
    edition: "Deutsch – Vietnamesisch",
    currency: "Preise in Euro (€)",
    search: "Gericht oder Nummer suchen …",
    all: "Alle",
    results: "{n} Treffer",
    empty: "Keine Treffer.",
    original: "Original-Speisekarte",
    spicy: "Scharf",
    count: "{n} Gerichte & Getränke · Nr. 1–{n}",
  },
  gallery: {
    eyebrow: "Einblicke",
    title: "Drinnen & draußen",
    text: "Echte Momente aus unserem Restaurant – von der Terrasse bis an den Tisch.",
    video: "Video",
    open: "Vergrößern",
    more: "Mehr anzeigen",
    filters: { all: "Alle", kitchen: "Küche", inside: "Gaststube", terrace: "Terrasse" },
  },
  visit: {
    eyebrow: "Besuchen Sie uns",
    title: "Restaurant finden",
    country: "Tschechische Republik",
    border: "Direkt an der Grenze zu Deutschland (Folmava – Furth im Wald)",
    openMaps: "In Google Maps öffnen",
    directions: "Route planen",
    mapConsent: "Beim Laden der Karte werden Daten an Google übertragen.",
    mapLoad: "Karte laden",
    hoursTitle: "Öffnungszeiten",
    days: "Montag – Sonntag",
    daysShort: "Mo – So",
    kitchen: "Küche",
    daily: "Täglich geöffnet – ohne Ruhetag",
    contactTitle: "Kontakt & Reservierung",
    call: "Anrufen",
  },
  footer: { about: "Asiatische Küche direkt an der deutsch-tschechischen Grenze. Täglich geöffnet.", explore: "Entdecken", visit: "Besuch", language: "Sprache", rights: "Alle Rechte vorbehalten." },
  mobile: { call: "Anrufen", menu: "Karte", route: "Route" },
  alt: {
    logo: "Logo T&H Restaurant New Asian",
    heroVideo: "Nudeln werden im Wok über offener Flamme geschwenkt",
    heroVideo2: "Gericht aus unserer Küche",
    interior: "Holzvertäfelte Gaststube mit Gästen und Blütenzweigen",
    interiorWindow: "Gäste an einem Holztisch am Fenster",
    dish: "Teller mit Ente, Reis und Salat",
    still: "Gericht aus unserer Küche",
    dishSteak: "Rindersteak mit Pilzsauce, Kroketten und Salat",
    dishPrawns: "Panierte Garnelen mit süß-scharfem Dip",
    guestsSizzling: "Zwei Gäste am Tisch mit knuspriger Ente auf der heißen Pfanne",
    videoDuckSizzling: "Video: knusprige Ente auf der heißen Pfanne",
    terraceView: "Gäste auf der Terrasse mit Blick auf grüne Hügel",
    terraceGroup: "Große Gruppe beim Essen auf der Terrasse",
    terraceUmbrellas: "Terrasse unter grünen Sonnenschirmen",
    interiorBar: "Gäste in der Gaststube",
    guestsDining: "Gäste beim Essen in der Gaststube",
    familyTable: "Familie mit vielen Gerichten am Tisch",
    guestsTable: "Zwei Gäste am Tisch in der Gaststube",
    videoDish: "Video: Gericht aus unserer Küche",
    videoInside: "Video: Gäste in der vollen Gaststube",
    videoTerrace: "Video: Gäste auf der Terrasse unter Sonnenschirmen",
    videoExterior: "Video: Eingang des T&H Restaurant und Parkplatz",
  },
};

const cs: Dict = {
  meta: {
    title: "T&H Restaurant New Asian – asijská restaurace na Folmavě, Česká Kubice",
    description:
      "T&H Restaurant New Asian v Horní Folmavě (Česká Kubice), přímo na česko-německé hranici. Otevřeno denně 10–22 h. Kompletní jídelní lístek s cenami v Kč.",
  },
  nav: { home: "Úvod", menu: "Jídelní lístek", restaurant: "Restaurace", gallery: "Galerie", contact: "Kontakt", openMenu: "Otevřít menu", close: "Zavřít", switchTo: "Změnit jazyk" },
  hero: {
    eyebrow: "Asijská kuchyně · Horní Folmava",
    lead: "Čerstvě připravená asijská kuchyně – v útulném lokále s dřevěným obložením nebo na terase s výhledem do zeleně. Přímo na česko-německé hranici, sedm dní v týdnu.",
    ctaMenu: "Prohlédnout menu",
    ctaFind: "Najít restauraci",
    openDaily: "Otevřeno denně",
  },
  about: {
    eyebrow: "Restaurace",
    title: "Místo, kde se rádi zastavíte.",
    p1: "Mezi Bavorským lesem a Šumavou, přímo u hraničního přechodu Folmava, vítá T&H Restaurant New Asian hosty z Česka i Německa. V nabídce najdete asijská a vietnamská jídla i evropskou klasiku.",
    p2: "Uvnitř vás čeká útulný lokál s dřevěným obložením, venku prostorná terasa pod velkými slunečníky – pro rodinný oběd, zastávku na cestě nebo večer s přáteli.",
    facts: [["7/7", "Otevřeno denně"], ["155", "Jídel a nápojů"], ["Terasa", "S výhledem do zeleně"]],
  },
  food: {
    eyebrow: "Z naší kuchyně",
    title: "Podáváme horké. Servírujeme s péčí.",
    text: "Nahlédněte do naší kuchyně – takto u nás jídla přicházejí na stůl.",
    captions: ["Asijská hlavní jídla", "Horká pánvička", "Evropská hlavní jídla", "Předkrmy"],
    toMenu: "Na jídelní lístek",
  },
  menu: {
    eyebrow: "Jídelní lístek",
    title: "Naše nabídka",
    edition: "Česky – vietnamsky",
    currency: "Ceny v Kč",
    search: "Hledat jídlo nebo číslo …",
    all: "Vše",
    results: "Nalezeno: {n}",
    empty: "Nic nenalezeno.",
    original: "Originální lístek",
    spicy: "Pálivé",
    count: "{n} jídel a nápojů · č. 1–{n}",
  },
  gallery: {
    eyebrow: "Nahlédněte k nám",
    title: "Uvnitř i venku",
    text: "Skutečné okamžiky z naší restaurace – od terasy až ke stolu.",
    video: "Video",
    open: "Zvětšit",
    more: "Zobrazit více",
    filters: { all: "Vše", kitchen: "Kuchyně", inside: "Lokál", terrace: "Terasa" },
  },
  visit: {
    eyebrow: "Navštivte nás",
    title: "Najít restauraci",
    country: "Česká republika",
    border: "Přímo na hranici s Německem (Folmava – Furth im Wald)",
    openMaps: "Otevřít v Google Maps",
    directions: "Naplánovat trasu",
    mapConsent: "Při načtení mapy budou data přenesena do Googlu.",
    mapLoad: "Načíst mapu",
    hoursTitle: "Otevírací doba",
    days: "Pondělí – Neděle",
    daysShort: "Po – Ne",
    kitchen: "Kuchyně",
    daily: "Otevřeno denně – bez zavíracího dne",
    contactTitle: "Kontakt a rezervace",
    call: "Zavolat",
  },
  footer: { about: "Asijská kuchyně přímo na česko-německé hranici. Otevřeno denně.", explore: "Prozkoumat", visit: "Návštěva", language: "Jazyk", rights: "Všechna práva vyhrazena." },
  mobile: { call: "Volat", menu: "Lístek", route: "Trasa" },
  alt: {
    logo: "Logo T&H Restaurant New Asian",
    heroVideo: "Nudle se smaží ve woku nad otevřeným ohněm",
    heroVideo2: "Jídlo z naší kuchyně",
    interior: "Lokál s dřevěným obložením, hosty a kvetoucími větvemi",
    interiorWindow: "Hosté u dřevěného stolu u okna",
    dish: "Talíř s kachnou, rýží a salátem",
    still: "Jídlo z naší kuchyně",
    dishSteak: "Hovězí steak s houbovou omáčkou, krokety a salátem",
    dishPrawns: "Obalované krevety se sladkopálivým dipem",
    guestsSizzling: "Dva hosté u stolu s křupavou kachnou na horké pánvičce",
    videoDuckSizzling: "Video: křupavá kachna na horké pánvičce",
    terraceView: "Hosté na terase s výhledem na zelené kopce",
    terraceGroup: "Velká skupina při jídle na terase",
    terraceUmbrellas: "Terasa pod zelenými slunečníky",
    interiorBar: "Hosté v lokále",
    guestsDining: "Hosté při jídle v lokále",
    familyTable: "Rodina s mnoha pokrmy na stole",
    guestsTable: "Dva hosté u stolu v lokále",
    videoDish: "Video: jídlo z naší kuchyně",
    videoInside: "Video: hosté v plném lokále",
    videoTerrace: "Video: hosté na terase pod slunečníky",
    videoExterior: "Video: vchod do T&H Restaurant a parkoviště",
  },
};

const dictionaries = { de, cs } as const;
export const getDict = (l: LocaleKey): Dict => dictionaries[localeConfig[l].lang];
