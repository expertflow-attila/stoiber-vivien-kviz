import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { AutoScrollReveal } from "@/components/motion/AutoScrollReveal";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://stoiber-vivien-kviz.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Szolgáltatásaim — Stoiber Vivien",
    template: "%s | Stoiber Vivien",
  },
  description:
    "Válaszd ki a hozzád illő utat: hozzátartozói, intézményi vagy céges támogatás Stoiber Vivientől, a demenciáról érthetően.",
  keywords: [
    "demencia",
    "demenciaedukáció",
    "Stoiber Vivien",
    "demenciáról érthetően",
    "demencia tanácsadás",
  ],
  authors: [{ name: "Stoiber Vivien" }],
  creator: "Stoiber Vivien",
  publisher: "Stoiber Vivien",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "hu_HU",
    url: SITE_URL,
    title: "Szolgáltatásaim — Stoiber Vivien",
    description:
      "Válaszd ki a hozzád illő utat: hozzátartozóknak, intézményeknek és cégeknek.",
    siteName: "A demenciáról érthetően",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3eddf" },
    { media: "(prefers-color-scheme: dark)", color: "#424f36" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="hu"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a href="#main" className="skip-link">
          Ugrás a tartalomra
        </a>
        <AutoScrollReveal rootSelector="#main" />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
