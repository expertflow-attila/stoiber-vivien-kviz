/**
 * A 3 célcsoport, amit a kvíz szegmentál.
 * Single-source-of-truth a kvíz-app számára.
 *
 * Az `href` mindig a vivien-site (demenciarolerthetoen.hu) megfelelő
 * szolgáltatási oldalára mutat — soha nem belső, mert ez a kvíz-app
 * csak elirányítja a látogatót oda.
 */

export type AudienceSlug = "hozzatartozo" | "intezmeny" | "ceg";

export type Audience = {
  slug: AudienceSlug;
  /** A kvíz oldal kártyáján megjelenő rövid címke (eyebrow felett) */
  quizEyebrow: string;
  /** A kvíz kártya nagy címe (Cormorant) */
  quizTitle: string;
  /** A kvíz kártya rövid leírása alatta (Inter) */
  quizBody: string;
  /** Result page heading */
  resultTitle: string;
  /** Result page italic emocionális kulcsszó (max 2 szó) */
  resultItalic: string;
  /** Result page bevezető a szolgáltatás-blokk fölött */
  resultIntro: string;
  /** A vivien-site szolgáltatási oldal teljes URL-je */
  serviceUrl: string;
  /** Vivien-site service-page nevező a CTA gombon */
  serviceCtaLabel: string;
};

const VIVIEN_SITE = "https://stoiber-vivien-weboldal.vercel.app";

export const audiences: Record<AudienceSlug, Audience> = {
  hozzatartozo: {
    slug: "hozzatartozo",
    quizEyebrow: "Családoknak",
    quizTitle: "Magamnak vagy a családomnak",
    quizBody:
      "Hozzátartozóként élem át a demenciát — közelről, nap mint nap.",
    resultTitle: "Hozzátartozóknak",
    resultItalic: "melléd állok",
    resultIntro:
      "Támogatás és útmutatás a demenciában érintett családok mindennapjaihoz. Segítség megterhelő helyzetekben, nehéz döntésekben és azokban a dilemmákban, amelyekre senki nem készít fel előre.",
    serviceUrl: `${VIVIEN_SITE}/szolgaltatasok/hozzatartozoknak`,
    serviceCtaLabel: "Tovább a hozzátartozói oldalra",
  },
  intezmeny: {
    slug: "intezmeny",
    quizEyebrow: "Szakembereknek",
    quizTitle: "Szakmai ellátóként vagy intézményben",
    quizBody:
      "Idősellátásban, kórházban vagy demenciagondozó környezetben dolgozom.",
    resultTitle: "Intézményeknek",
    resultItalic: "közös ügyünk",
    resultIntro:
      "Gyakorlati szemléletű előadások és szakmai támogatás demenciával élő emberekről gondoskodó szakemberek és intézmények számára — modern kutatásokra, emberközpontú szemléletre és svájci gyakorlatokra építve.",
    serviceUrl: `${VIVIEN_SITE}/szolgaltatasok/intezmenyeknek`,
    serviceCtaLabel: "Tovább az intézményi oldalra",
  },
  ceg: {
    slug: "ceg",
    quizEyebrow: "Vállalatoknak",
    quizTitle: "Munkahelyként vagy vezetőként",
    quizBody:
      "Cégnél vagy HR-ben dolgozom, és a kollégáim agyi egészsége is fontos.",
    resultTitle: "Cégeknek",
    resultItalic: "együtt könnyebb",
    resultIntro:
      "Szemléletformáló előadások és workshopok az agyi egészségről, a kiégés megelőzéséről és a hozzátartozóit gondozó munkavállalók támogatásáról. Mert a valódi törődés az emberek élethelyzeteinek megértésével kezdődik.",
    serviceUrl: `${VIVIEN_SITE}/szolgaltatasok/cegeknek`,
    serviceCtaLabel: "Tovább a céges oldalra",
  },
};

export const audienceOrder: AudienceSlug[] = [
  "hozzatartozo",
  "intezmeny",
  "ceg",
];
