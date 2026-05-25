import type { AudienceSlug } from "./audiences";

/**
 * A 8 lead magnet PDF a /public/magnetek/ alatt él.
 * Minden célcsoporthoz egy default magnet kerül a result page-en,
 * + opcionálisan a többi ajánlott a "további" listából.
 */

export type Magnet = {
  /** PDF fájlnév (slug) — /public/magnetek/{slug}.pdf */
  slug: string;
  title: string;
  /** Egy mondatos kedvcsináló a result page magnet-kártyához */
  hook: string;
  /** Hány perces olvasás (rough — a card metaadat-soron) */
  readTime: string;
};

export const magnets: Record<string, Magnet> = {
  "01-demens-szulo-utikalauz": {
    slug: "01-demens-szulo-utikalauz",
    title: "Demens szülő — útikalauz a most rád szakadt napokra",
    hook: "Ha most kaptátok a diagnózist, ez a kalauz a következő hét stabilabb lépéseit segít megtervezni.",
    readTime: "12 perc",
  },
  "02-mikor-a-parod-elveszik-benne": {
    slug: "02-mikor-a-parod-elveszik-benne",
    title: "Mikor a párod elveszik a demenciában",
    hook: "Egy hosszabb olvasás arról, hogyan őrizhetitek meg a kapcsolatotokat akkor is, amikor lassan ő már nem ő.",
    readTime: "10 perc",
  },
  "03-tiz-jel-ami-nem-demencia": {
    slug: "03-tiz-jel-ami-nem-demencia",
    title: "Tíz jel, ami NEM feltétlenül demencia",
    hook: "Sok család túl korán riad meg — itt a tíz leggyakoribb tévhit, amit érdemes ismerned, mielőtt aggódnál.",
    readTime: "8 perc",
  },
  "04-tizenket-tudomanyos-szokas": {
    slug: "04-tizenket-tudomanyos-szokas",
    title: "Tizenkét tudományosan megalapozott szokás demenciagondozóknak",
    hook: "Szakmai, kutatás-alapú checklist a napi gondozói gyakorlathoz — intézményi környezetre szabva.",
    readTime: "14 perc",
  },
  "05-lathatatlan-terheles-hr": {
    slug: "05-lathatatlan-terheles-hr",
    title: "A láthatatlan terhelés — HR-eseknek és vezetőknek",
    hook: "Mit nem mondanak el a hozzátartozóikat gondozó munkavállalók, és hogyan veheted észre időben a jeleket.",
    readTime: "9 perc",
  },
  "06-demencia-kommunikacio-kodex": {
    slug: "06-demencia-kommunikacio-kodex",
    title: "Demencia-kommunikáció kódex",
    hook: "A 14 leggyakoribb nehéz helyzet — és szakmailag, emberileg jó válasz mindegyikre.",
    readTime: "16 perc",
  },
  "07-viselkedes-ami-nem-agresszio": {
    slug: "07-viselkedes-ami-nem-agresszio",
    title: "Viselkedés, ami nem agresszió",
    hook: "Hogyan értsd meg azokat a megterhelő pillanatokat, amikor a szeretted „dacol” veled — és mi van valójában mögötte.",
    readTime: "11 perc",
  },
  "08-hatvan-masodperc-vezetonek": {
    slug: "08-hatvan-masodperc-vezetonek",
    title: "60 másodperc vezetőnek",
    hook: "Hat rövid, gyakorlati kapaszkodó vezetőknek, hogy emberközpontúbban kezeljék a kiégés és gondozói terhelés jeleit a csapatban.",
    readTime: "5 perc",
  },
};

/**
 * Default magnet célcsoportonként (a result page primary-recommendation).
 * További ajánlott magnetek a "moreMagnets" tömbben — később lehet
 * rotálni / „még 2 hasonló" link mögé rejteni.
 */
export const audienceMagnetMap: Record<
  AudienceSlug,
  { default: string; more: string[] }
> = {
  hozzatartozo: {
    default: "01-demens-szulo-utikalauz",
    more: ["02-mikor-a-parod-elveszik-benne", "03-tiz-jel-ami-nem-demencia", "07-viselkedes-ami-nem-agresszio"],
  },
  intezmeny: {
    default: "06-demencia-kommunikacio-kodex",
    more: ["04-tizenket-tudomanyos-szokas"],
  },
  ceg: {
    default: "08-hatvan-masodperc-vezetonek",
    more: ["05-lathatatlan-terheles-hr"],
  },
};
