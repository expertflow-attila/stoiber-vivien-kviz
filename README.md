# stoiber-vivien-kviz

Szegmentáló kvíz-landoló Stoiber Vivien — A demenciáról érthetően.

Belépési pont az Instagram bio / Facebook link / hub-app számára. Egyetlen
gyors kérdés alapján 3 célcsoportra szegmentál (hozzátartozók /
intézmények / cégek), és a látogatót a megfelelő szolgáltatási oldalra
irányítja a demenciarolerthetoen.hu-n — közben azonnal letölthető lead
magnetet és 3 mély cikket is ajánl.

- **Stack**: Next.js 16 (App Router, Turbopack), React 19, Tailwind v4, Motion, Zod, MailerLite.
- **Sister sites**: [vivien-site](https://stoiber-vivien-weboldal.vercel.app), [hub-app], [2.0], [app].
- **Brand-tokens**: 1:1 a vivien-site `globals.css` `@theme` blokkjából.

## Dev

```sh
npm install
npm run dev
# http://localhost:3000
```

## Build

```sh
npm run build
npm start
```

## Routes

| Route | Leírás |
|---|---|
| `/` | A kvíz: 1 kérdés, 3 válasz |
| `/eredmeny/hozzatartozo` | Hozzátartozói result page |
| `/eredmeny/intezmeny` | Intézményi result page |
| `/eredmeny/ceg` | Céges result page |
| `/api/subscribe` | Opcionális MailerLite feliratkozás (audience-tagga) |

## Tartalom

- `content/audiences.ts` — a 3 célcsoport copy-ja és redirect URL-jei
- `content/magnets.ts` — magnet-PDF metaadatok + audience → default magnet mapping
- `content/articles.ts` — célcsoportonként 3 kurálatlan cikk a vivien-site /megjelenesek-ből
- `public/magnetek/*.pdf` — a 8 lead magnet (a lead-magnet pipeline outputja)

## Brand

A kvíz a vivien-site brand-rendszerével él 1:1-ben: cream/sage/ink
palette, Cormorant Garamond (display) + Inter (body), soft motion
(out-soft easing, 360-860ms tartomány), lance botanikai akcent.
A non-negotiable szabályok ugyanazok mint a vivien-site-nál:
nincs blue, nincs neon, nincs emoji, italic csak emocionális keywords-re.
