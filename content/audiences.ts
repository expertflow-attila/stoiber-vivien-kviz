/**
 * A 3 célcsoport, amit a kvíz szegmentál.
 * Single-source-of-truth a kvíz-app számára.
 *
 * Az `serviceUrl` mindig a vivien-site (demenciarolerthetoen.hu) megfelelő
 * szolgáltatási oldalára mutat — soha nem belső, mert ez a kvíz-app
 * csak elirányítja a látogatót oda.
 */

export type AudienceSlug = "hozzatartozo" | "intezmeny" | "ceg";

export type Audience = {
  slug: AudienceSlug;
  /** Eyebrow a kvíz kártya felett (kategória-cimke) */
  quizEyebrow: string;
  /** A kvíz kártya nagy címe (Cormorant) — szolgáltatás neve */
  quizTitle: string;
  /** Rövid Vivien-szemszögű leírás a kvíz kártyán */
  quizBody: string;
  /** Result page heading */
  resultTitle: string;
  /** Result page italic emocionális kulcsszó (max 2 szó) */
  resultItalic: string;
  /** Result page bevezető a szolgáltatás-blokk fölött */
  resultIntro: string;
  /** A vivien-site szolgáltatási oldal teljes URL-je */
  serviceUrl: string;
  /** Service CTA gomb felirata */
  serviceCtaLabel: string;
};

const VIVIEN_SITE = "https://stoiber-vivien-weboldal.vercel.app";

export const audiences: Record<AudienceSlug, Audience> = {
  hozzatartozo: {
    slug: "hozzatartozo",
    quizEyebrow: "Családoknak",
    quizTitle: "Hozzátartozóknak",
    quizBody:
      "Támogatás demenciában érintett családoknak a nehéz mindennapokhoz és döntésekhez.",
    resultTitle: "Hozzátartozóknak",
    resultItalic: "melléd állok",
    resultIntro:
      "Útmutatás és támogatás a demenciában érintett családok mindennapjaihoz. Segítség megterhelő helyzetekben, nehéz döntésekben és azokban a dilemmákban, amelyekre senki nem készít fel előre.",
    serviceUrl: `${VIVIEN_SITE}/szolgaltatasok/hozzatartozoknak`,
    serviceCtaLabel: "Tovább a hozzátartozói oldalra",
  },
  intezmeny: {
    slug: "intezmeny",
    quizEyebrow: "Szakembereknek",
    quizTitle: "Intézményeknek",
    quizBody:
      "Szakmai támogatás demenciaellátásban dolgozó szakembereknek és intézményeknek.",
    resultTitle: "Intézményeknek",
    resultItalic: "közös ügyünk",
    resultIntro:
      "Gyakorlati szemléletű előadások és szakmai támogatás demenciával élő emberekről gondoskodó szakembereknek és intézményeknek — modern kutatásokra, emberközpontú szemléletre és svájci gyakorlatokra építve.",
    serviceUrl: `${VIVIEN_SITE}/szolgaltatasok/intezmenyeknek`,
    serviceCtaLabel: "Tovább az intézményi oldalra",
  },
  ceg: {
    slug: "ceg",
    quizEyebrow: "Vállalatoknak",
    quizTitle: "Cégeknek",
    quizBody:
      "Előadások és workshopok az agyi egészségről, a kiégésről és a gondozó munkavállalókról.",
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
