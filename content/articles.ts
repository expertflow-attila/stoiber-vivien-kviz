import type { AudienceSlug } from "./audiences";

/**
 * Célcsoportonként 3 kurált cikk a vivien-site /megjelenesek tartalmából.
 * A result page tertiary blokkjához.
 *
 * NB.: nem importáljuk a vivien-site `content/press.ts`-t — saját
 * snapshot, hogy a két projekt függetlenül deployolható maradjon.
 *
 * Magyar curly quote-ok (U+201E „ és U+201D ”) használva, mert a
 * Turbopack lexer panikol a straight " keveredésén string határoló "-val.
 */

export type Article = {
  title: string;
  outlet: string;
  url: string;
  summary: string;
  kind: "cikk" | "interju" | "podcast";
};

export const articlesByAudience: Record<AudienceSlug, Article[]> = {
  hozzatartozo: [
    {
      kind: "cikk",
      title: "„Éjjelente fekszem az ágyban…” — demenciával érintett családok láthatatlan harca",
      outlet: "WMN",
      url: "https://wmn.hu/creator/65865-demencia-csaladok-gondozas-kilatastalansag",
      summary: "Az egyik legerősebb hozzátartozói írás a kimerülésről, magányról és segítségkérésről.",
    },
    {
      kind: "cikk",
      title: "„Aki ilyet mond, nem ápolt még demens embert” — válasz a kommentcunamira",
      outlet: "WMN",
      url: "https://wmn.hu/creator/65249-demencia-alzheimer-gondozas-gyogytornasz",
      summary: "Erős társadalmi reakció a demenciagondozással kapcsolatos ítélkező kommentekre.",
    },
    {
      kind: "cikk",
      title: "„Dehogy megyek orvoshoz!” — Sok demenciával élő ember ezért utasítja el az orvosi vizsgálatot",
      outlet: "WMN",
      url: "https://wmn.hu/creator/65008-demencia-alzheimer-orvos-vizsgalat",
      summary: "Mit tehet a család, amikor a kivizsgálás elutasítása állandó konfliktusforrás.",
    },
  ],
  intezmeny: [
    {
      kind: "cikk",
      title: "Babaterápia demenciában: valódi kapaszkodó vagy félreértett módszer?",
      outlet: "WMN",
      url: "https://wmn.hu/creator/66131-babaterapia-demenciaban-alzheimer-felreertett-modszer",
      summary: "Szakmai, differenciáló téma a demenciaellátás egyik sokat vitatott módszeréről.",
    },
    {
      kind: "cikk",
      title: "„Hát ez is alig várta, hogy otthonba dughassa az anyját!” — Az intézményi elhelyezés dilemmái",
      outlet: "WMN",
      url: "https://wmn.hu/creator/64197-idosgondozas-demencia-intezmenyi-otthonban-elhelyezes",
      summary: "Az intézményi elhelyezés bűntudata, felelőssége és családi terhe.",
    },
    {
      kind: "interju",
      title: "Felerősíti a demenciával élő emberek hangját: Stoiber Vivien küldetése",
      outlet: "WMN",
      url: "https://wmn.hu/creator/64305-stoiber-vivien-demenciaszakerto-gyogytornasz",
      summary: "Személyes portré Vivien küldetéséről és arról, miért lett a demenciaedukáció a szívügye.",
    },
  ],
  ceg: [
    {
      kind: "cikk",
      title: "Amikor már te vagy az anyukád anyukája is — A szendvicsgeneráció küzdelme",
      outlet: "WMN",
      url: "https://wmn.hu/creator/64539-szendvicsgeneracio-demencia-otthonapolas",
      summary: "A középgeneráció láthatatlan terhei munka, gyereknevelés és idős szülő gondozása között.",
    },
    {
      kind: "cikk",
      title: "Így csempéssz több mozgást az életedbe szinte észrevétlenül",
      outlet: "WMN",
      url: "https://wmn.hu/creator/65578-mindennapi-mozgas-egeszseges-eletmod-nezettelenul",
      summary: "Kíméletes, hétköznapi mozgásötletek az egészségesebb idősödéshez.",
    },
    {
      kind: "cikk",
      title: "A demencia és az Alzheimer-kór nem ugyanaz!",
      outlet: "WMN",
      url: "https://wmn.hu/wmn-life/64253-demencia-alzheimer-kulonbsegek",
      summary: "Közérthető tisztázás a két gyakran összemosott fogalomról.",
    },
  ],
};
